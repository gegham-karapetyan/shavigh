import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
import {
  GetBibleDynamicPageModel,
  GetSaintsBehaviorPageModel,
} from "@/http-api/interfaces/site-pages.models";
import { useMemo } from "react";
import { ErrorView } from "../ErrorView";
import { Stack, Typography } from "@mui/material";
import { CopyBtn } from "../CopyBtn";
import { getLastPathSegment } from "@/utls/urls";
import Link from "next/link";
import { useGetUnusedSaintsBehaviorPages } from "../../api-hooks/useGetUnusedSaintsBehaviorPages";

ModuleRegistry.registerModules([AllCommunityModule]);

export const UnusedSaintsBehaviorPagesTable = () => {
  const { data, isError, isFetching } = useGetUnusedSaintsBehaviorPages();

  const columnsDef = useMemo<
    ColDef<Omit<GetSaintsBehaviorPageModel, "content">>[]
  >(() => {
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
          const fullUrl = "/" + data.url;
          const lastPath = getLastPathSegment(fullUrl);

          return (
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2" color="textSecondary">
                {lastPath}
              </Typography>
              <CopyBtn value={fullUrl} />
            </Stack>
          );
        },
      },
      {
        field: "url",
        headerName: "Page",
        flex: 1,
        cellRenderer: ({ data }: { data: GetBibleDynamicPageModel }) => {
          return (
            <Link
              className="cursor-pointer"
              href={`/admin/dashboard/site-view?previewPathname=/site-preview/${data.url}`}
            >
              Go to page {"->"}
            </Link>
          );
        },
      },
    ];
  }, []);
  if (isError) return <ErrorView />;
  return (
    <AgGridReact loading={isFetching} rowData={data} columnDefs={columnsDef} />
  );
};
