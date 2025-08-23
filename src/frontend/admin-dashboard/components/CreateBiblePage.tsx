import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import { useBibleNavigationMenuData } from "../api-hooks/useBibleNavigationMenuData";
import { DraggableDialog } from "./DraggableDialog";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loading } from "./Loading";
import * as yup from "yup";
import { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import slugify from "slugify";
import { UpdateBibleDynamicPageModel } from "@/http-api/interfaces/site-pages.models";
import { PAGE_STATUS } from "@/constants";
import { useSnackbar } from "notistack";
import { GET_UNUSED_BIBLE_PAGES_QUERY_KEY } from "../api-hooks/useGetUnusedBiblePages";

const testamentMapping = {
  newTestament: "ՆՈՐ ԿՏԱԿԱՐԱՆ",
  oldTestament: "ՀԻՆ ԿՏԱԿԱՐԱՆ",
};
const languagesMapping = {
  ararat: "ԱՐԱՐԱՏ",
  grabar: "ԳՐԱԲԱՐ",
  echmiadzin: "ԷՋՄԻԱԾԻՆ",
};

interface BiblePageFormModel {
  lg: keyof typeof languagesMapping | null;
  testament: keyof typeof testamentMapping | null;
  book: null | { title: string; slug: string; id: number };
  chapter: null | { title: string; url: string; id: number };
  title: string;
  slug: string;
}

const validation: yup.ObjectSchema<BiblePageFormModel> = yup.object({
  lg: yup.mixed<keyof typeof languagesMapping>().nullable().required("req"),
  testament: yup
    .mixed<keyof typeof testamentMapping>()
    .nullable()
    .required("required"),
  book: yup
    .object({
      title: yup.string().required(),
      slug: yup.string().required(),
      id: yup.number().required(),
    })
    .nullable()
    .required("required"),
  chapter: yup
    .object({
      title: yup.string().required(),
      url: yup.string().required(),
      id: yup.number().required(),
    })
    .nullable()
    .required("required"),
  title: yup.string().trim().required("required"),
  slug: yup
    .string()
    .trim()
    .required("required")
    .matches(/^[a-zA-Z0-9-]+$/, "only numbers and letters are allowed"),
});

export interface CreateBiblePageProps {
  onClose: () => void;
}

const useCreateBiblePage = () => {
  return useMutation({
    mutationFn: (data: UpdateBibleDynamicPageModel) =>
      axios.post<void>("/api/site-preview/bible/chapter-or-page", data, {
        params: {
          pageType: "page",
        },
      }),
  });
};

export const CreateBiblePage: FC<CreateBiblePageProps> = ({ onClose }) => {
  const { mutate: createBiblePage } = useCreateBiblePage();
  const queryClient = useQueryClient();
  const { data, isSuccess, isLoading } = useBibleNavigationMenuData();
  const { enqueueSnackbar } = useSnackbar();
  const { control, watch, setValue, handleSubmit } =
    useForm<BiblePageFormModel>({
      mode: "onBlur",
      defaultValues: {
        lg: null,
        testament: null,
        book: null,
        chapter: null,
        title: "",
        slug: "",
      },
      resolver: yupResolver(validation),
    });
  const testament = watch("testament");
  const selectedBook = watch("book");
  const lg = watch("lg");

  const booksOptions = data && testament && lg ? data[testament][lg] : [];
  const chaptersOptions =
    booksOptions.find((book) => book.id === selectedBook?.id)?.chapters || [];

  const onSave: SubmitHandler<BiblePageFormModel> = async (data) => {
    const slug = slugify(data.slug, {
      lower: true,
      strict: true,
      replacement: "-",
    });
    const { status } = await axios.get(
      "/api/site-preview/bible/chapter-or-page",
      {
        params: {
          lg: data.lg,
          testament: data.testament!.toLowerCase(),
          book: data.book!.slug,
          chapter: data.chapter!.url.split("/").at(-1),
          page: data.slug,
        },
        validateStatus: () => true,
      }
    );
    if (status === 404) {
      createBiblePage(
        {
          title: data.title!,
          content: "<div>New Content</div>",
          bibleBookChapterUnattachedPageIds: [],
          url: `${data.chapter!.url}/${slug}`,
          nextLink: null,
          prevLink: null,
          bibleBookChapterId: data.chapter!.id,
          linkToDefaultContent: null,
          status: PAGE_STATUS.DRAFT,
          bibleBookId: data.book!.id,
        },
        {
          onSuccess() {
            enqueueSnackbar("Բաժինը ստեղծվել է", {
              variant: "success",
            });
            queryClient.refetchQueries({
              queryKey: [GET_UNUSED_BIBLE_PAGES_QUERY_KEY],
            });
            onClose();
          },
          onError() {
            enqueueSnackbar("Սխալ է տեղի ունեցել", {
              variant: "error",
            });
            onClose();
          },
        }
      );
    } else {
      enqueueSnackbar("Այս էջը արդեն գոյություն ունի", {
        variant: "error",
      });
    }
  };

  return (
    <DraggableDialog
      onClose={onClose}
      onSave={handleSubmit(onSave)}
      open
      size="sm"
      title="Create Bible Page"
    >
      {isLoading && <Loading />}
      {isSuccess && (
        <Stack gap={2} mt={2}>
          <Controller
            control={control}
            name="testament"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Autocomplete
                fullWidth
                value={value}
                onChange={(_, value) => {
                  onChange(value);
                  if (value === null) {
                    setValue("book", null, { shouldValidate: true });
                    setValue("chapter", null, { shouldValidate: true });
                  }
                }}
                onBlur={onBlur}
                options={Object.keys(testamentMapping)}
                isOptionEqualToValue={(option, value) => option === value}
                getOptionLabel={(option) =>
                  testamentMapping[option as keyof typeof testamentMapping]
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!error}
                    helperText={error?.message}
                    label="Ընտրել Կտակարանը"
                  />
                )}
              />
            )}
          />
          <Controller
            control={control}
            name="lg"
            render={({
              field: { onChange, onBlur, value },
              fieldState: {},
            }) => (
              <Autocomplete
                fullWidth
                value={value}
                onChange={(_, value) => {
                  onChange(value);
                  if (value === null) {
                    setValue("book", null, { shouldValidate: true });
                    setValue("chapter", null, { shouldValidate: true });
                  }
                }}
                onBlur={onBlur}
                options={Object.keys(languagesMapping)}
                isOptionEqualToValue={(option, value) => option === value}
                getOptionLabel={(option) =>
                  languagesMapping[option as keyof typeof languagesMapping]
                }
                renderInput={(params) => (
                  <TextField {...params} label="Ընտրել Թարգմանությունը" />
                )}
              />
            )}
          />
          <Controller
            control={control}
            name="book"
            render={({ field: { onChange, onBlur, value } }) => (
              <Autocomplete
                fullWidth
                value={value}
                onChange={(_, value) => {
                  onChange(value);
                  if (value === null) {
                    setValue("chapter", null, { shouldValidate: true });
                  }
                }}
                onBlur={onBlur}
                options={booksOptions}
                isOptionEqualToValue={(option, value) =>
                  option.slug === value.slug
                }
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField {...params} label="Ընտրել Գիրքը" />
                )}
              />
            )}
          />
          <Controller
            control={control}
            name="chapter"
            render={({ field: { onChange, onBlur, value } }) => (
              <Autocomplete
                fullWidth
                value={value}
                onChange={(_, value) => onChange(value)}
                onBlur={onBlur}
                options={chaptersOptions}
                isOptionEqualToValue={(option, value) =>
                  option.title === value.title
                }
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField {...params} label="Ընտրել Գլուխը" />
                )}
              />
            )}
          />
          <Box
            bgcolor={(t) => t.palette.grey[100]}
            component="fieldset"
            borderRadius={1}
          >
            <Typography variant="caption" component="legend">
              Վերնագիր
            </Typography>
            <Stack gap={2}>
              <Controller
                control={control}
                name="title"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    sx={{ bgcolor: "background.paper" }}
                    fullWidth
                    label="Հայերեն"
                    helperText={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="slug"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    sx={{ bgcolor: "background.paper" }}
                    fullWidth
                    label="Անգլերեն"
                    helperText={error?.message}
                  />
                )}
              />
            </Stack>
          </Box>
        </Stack>
      )}
    </DraggableDialog>
  );
};
