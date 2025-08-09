import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
import {
  GetBibleDynamicPageModel,
  GetSaintsBehaviorPageModel,
} from "@/http-api/interfaces/site-pages.models";
import { useMemo } from "react";
import { ErrorView } from "../ErrorView";
import Link from "next/link";
import { useGetDraftSaintsBehaviorPages } from "../../api-hooks/useGetDraftSaintsBehaviorPages";

ModuleRegistry.registerModules([AllCommunityModule]);

export const DraftSaintsBehaviorPagesTable = () => {
  const { data, isError, isFetching } = useGetDraftSaintsBehaviorPages();

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
          return (
            <Link
              className="cursor-pointer"
              href={`/admin/dashboard/site-view?previewPathname=/site-preview/${data.url}`}
            >
              {data.url}
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
