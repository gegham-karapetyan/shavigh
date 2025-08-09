import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
import { GetBibleDynamicPageModel } from "@/http-api/interfaces/site-pages.models";
import { useMemo } from "react";
import { ErrorView } from "../ErrorView";
import { useGetUnusedBiblePages } from "../../api-hooks/useGetUnusedBiblePages";
import { Stack, Typography } from "@mui/material";
import { CopyBtn } from "../CopyBtn";
import { getLastPathSegment } from "@/utls/urls";

ModuleRegistry.registerModules([AllCommunityModule]);

export const UnusedBiblePagesTable = () => {
  const { data, isError, isLoading } = useGetUnusedBiblePages();

  const columnsDef = useMemo<ColDef<GetBibleDynamicPageModel>[]>(() => {
    return [
      {
        field: "id",
      },
      {
        field: "title",
      },
      {
        field: "url",
        flex: 1,
        cellRenderer: ({ data }: { data: GetBibleDynamicPageModel }) => {
          const lastPath = getLastPathSegment(data.url) || "";
          return (
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2" color="textSecondary">
                {lastPath}
              </Typography>
              <CopyBtn value={lastPath} />
            </Stack>
          );
        },
      },
    ];
  }, []);
  if (isError) return <ErrorView />;
  return (
    <AgGridReact loading={isLoading} rowData={data} columnDefs={columnsDef} />
  );
};
