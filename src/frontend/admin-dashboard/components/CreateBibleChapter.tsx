import { Autocomplete, Stack, TextField } from "@mui/material";
import { useBibleNavigationMenuData } from "../api-hooks/useBibleNavigationMenuData";
import { DraggableDialog } from "./DraggableDialog";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loading } from "./Loading";
import * as yup from "yup";
import { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UpdateBibleDynamicPageModel } from "@/http-api/interfaces/site-pages.models";
import { PAGE_STATUS } from "@/constants";
import { useSnackbar } from "notistack";
import { GET_DRAFT_BIBLE_CHAPTERS_QUERY_KEY } from "../api-hooks/useGetDraftBibleChapters";

const testamentMapping = {
  newTestament: "ՆՈՐ ԿՏԱԿԱՐԱՆ",
  oldTestament: "ՀԻՆ ԿՏԱԿԱՐԱՆ",
};
const languagesMapping = {
  ararat: "ԱՐԱՐԱՏ",
  grabar: "ԳՐԱԲԱՐ",
  echmiadzin: "ԷՋՄԻԱԾԻՆ",
};

interface BibleChapterFormModel {
  lg: keyof typeof languagesMapping | null;
  testament: keyof typeof testamentMapping | null;
  book: null | { title: string; slug: string; id: number };
  title: string;
}

const validation: yup.ObjectSchema<BibleChapterFormModel> = yup.object({
  lg: yup.mixed<keyof typeof languagesMapping>().nullable().required(),
  testament: yup.mixed<keyof typeof testamentMapping>().nullable().required(),
  book: yup
    .object({
      title: yup.string().required(),
      slug: yup.string().required(),
      id: yup.number().required(),
    })
    .nullable()
    .required(),
  title: yup
    .string()
    .trim()
    .required()
    .matches(/^[0-9 ]+$/, "Only numbers"),
});

export interface CreateBibleChapterProps {
  onClose: () => void;
}

const useCreateBibleChapter = () => {
  return useMutation({
    mutationFn: (data: UpdateBibleDynamicPageModel) =>
      axios.post<void>("/api/site-preview/bible/chapter-or-page", data, {
        params: {
          pageType: "chapter",
        },
      }),
  });
};

export const CreateBibleChapter: FC<CreateBibleChapterProps> = ({
  onClose,
}) => {
  const { mutate: createBibleChapter } = useCreateBibleChapter();
  const queryClient = useQueryClient();
  const { data, isSuccess, isLoading } = useBibleNavigationMenuData();
  const { enqueueSnackbar } = useSnackbar();
  const { control, watch, setValue, handleSubmit } =
    useForm<BibleChapterFormModel>({
      mode: "onBlur",
      defaultValues: {
        lg: null,
        testament: null,
        book: null,
        title: "",
      },
      resolver: yupResolver(validation),
    });
  const testament = watch("testament");
  const lg = watch("lg");

  const booksOptions = data && testament && lg ? data[testament][lg] : [];

  const onSave: SubmitHandler<BibleChapterFormModel> = async (data) => {
    // const slug = slugify(data.title, {
    //   lower: true,
    //   strict: true,
    //   replacement: "-",
    // });
    const url = `bible/${data.lg}/${data.testament!.toLowerCase()}/${
      data.book!.slug
    }/chapter${data.title}`;

    const { status } = await axios.get(
      "/api/site-preview/bible/chapter-or-page",
      {
        params: {
          lg: data.lg,
          testament: data.testament!.toLowerCase(),
          book: data.book!.slug,
          chapter: `chapter${data.title}`,
        },
        validateStatus: () => true,
      }
    );
    if (status === 404) {
      createBibleChapter(
        {
          title: data.title!,
          content: "<div>New Content</div>",
          bibleBookChapterUnattachedPageIds: [],
          url,
          nextLink: null,
          prevLink: null,
          linkToDefaultContent: null,
          status: PAGE_STATUS.DRAFT,
          bibleBookId: data.book!.id,
        },
        {
          onSuccess() {
            enqueueSnackbar("Բաժինը ստեղծվել է", {
              variant: "success",
            });
            queryClient.invalidateQueries({
              queryKey: [GET_DRAFT_BIBLE_CHAPTERS_QUERY_KEY],
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
      enqueueSnackbar("Այսպիսի բաժին արդեն կա", {
        variant: "error",
      });
    }
  };

  return (
    <DraggableDialog
      onClose={onClose}
      onSave={handleSubmit(onSave, console.log)}
      open
      size="sm"
      title="Create Bible Chapter"
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
              fieldState: { error },
            }) => (
              <Autocomplete
                fullWidth
                value={value}
                onChange={(_, value) => {
                  onChange(value);
                  if (value === null) {
                    setValue("book", null, { shouldValidate: true });
                  }
                }}
                onBlur={onBlur}
                options={Object.keys(languagesMapping)}
                isOptionEqualToValue={(option, value) => option === value}
                getOptionLabel={(option) =>
                  languagesMapping[option as keyof typeof languagesMapping]
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!error}
                    helperText={error?.message}
                    label="Ընտրել Թարգմանությունը"
                  />
                )}
              />
            )}
          />
          <Controller
            control={control}
            name="book"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <Autocomplete
                fullWidth
                value={value}
                onChange={(_, value) => onChange(value)}
                onBlur={onBlur}
                options={booksOptions}
                isOptionEqualToValue={(option, value) =>
                  option.slug === value.slug
                }
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!error}
                    helperText={error?.message}
                    label="Ընտրել Գիրքը"
                  />
                )}
              />
            )}
          />
          <Controller
            control={control}
            name="title"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                sx={{ bgcolor: "background.paper" }}
                fullWidth
                label="Գլխի համարը"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </Stack>
      )}
    </DraggableDialog>
  );
};
