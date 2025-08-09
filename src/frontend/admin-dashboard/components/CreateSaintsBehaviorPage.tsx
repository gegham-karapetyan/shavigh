import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import { DraggableDialog } from "./DraggableDialog";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loading } from "./Loading";
import * as yup from "yup";
import { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import slugify from "slugify";
import { UpdateSaintsBehaviorPageModel } from "@/http-api/interfaces/site-pages.models";
import { PAGE_STATUS } from "@/constants";
import { useSnackbar } from "notistack";
import { useGetSaintsBehaviorData } from "../api-hooks/useGetSaintsBehaviorData";
import { GET_DRAFT_SAINT_BEHAVIOR_PAGES_QUERY_KEY } from "../api-hooks/useGetDraftSaintsBehaviorPages";

interface SaintsBehaviorFormModel {
  section: null | { title: string; url: string; id: number };
  title: string;
  slug: string;
}

const validation: yup.ObjectSchema<SaintsBehaviorFormModel> = yup.object({
  section: yup
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

export interface CreateSaintsBehaviorPageProps {
  onClose: () => void;
}

const useCreateSaintsBehaviorPage = () => {
  return useMutation({
    mutationFn: (data: UpdateSaintsBehaviorPageModel) =>
      axios.post<void>("/api/site-preview/saintsbehavior/saints-page", data),
  });
};

export const CreateSaintsBehaviorPage: FC<CreateSaintsBehaviorPageProps> = ({
  onClose,
}) => {
  const { mutate: createSaintsBehaviorPage } = useCreateSaintsBehaviorPage();
  const queryClient = useQueryClient();
  const {
    data: sections = [],
    isSuccess,
    isLoading,
  } = useGetSaintsBehaviorData();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit } = useForm<SaintsBehaviorFormModel>({
    mode: "onBlur",
    defaultValues: {
      section: null,
      title: "",
      slug: "",
    },
    resolver: yupResolver(validation),
  });

  const onSave: SubmitHandler<SaintsBehaviorFormModel> = async (data) => {
    const slug = slugify(data.slug, {
      lower: true,
      strict: true,
      replacement: "-",
    });
    // const url = `/${data.chapter!.url}/${slug}`;
    createSaintsBehaviorPage(
      {
        title: data.title!,
        content: "<div>New Content</div>",
        sectionId: data.section!.id,
        attached: false,
        url: `${data.section!.url}/${slug}`,
        status: PAGE_STATUS.DRAFT,
      },
      {
        onSuccess() {
          enqueueSnackbar("Բաժինը ստեղծվել է", {
            variant: "success",
          });
          queryClient.refetchQueries({
            queryKey: [GET_DRAFT_SAINT_BEHAVIOR_PAGES_QUERY_KEY],
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
  };

  return (
    <DraggableDialog
      onClose={onClose}
      onSave={handleSubmit(onSave, console.log)}
      open
      size="sm"
      title="Create Saints Behavior Page"
    >
      {isLoading && <Loading />}
      {isSuccess && (
        <Stack gap={2} mt={2}>
          <Controller
            control={control}
            name="section"
            render={({ field: { onChange, onBlur, value } }) => (
              <Autocomplete
                fullWidth
                value={value}
                onChange={(_, value) => onChange(value)}
                onBlur={onBlur}
                options={sections}
                isOptionEqualToValue={(option, value) =>
                  option.title === value.title
                }
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField {...params} label="Ընտրել Ամիսը" />
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
