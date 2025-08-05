import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import type { ColDef } from "ag-grid-community";
import { GetBibleDynamicPageModel } from "@/http-api/interfaces/site-pages.models";
import { useMemo } from "react";
import { ErrorView } from "../ErrorView";
import Link from "next/link";
import { useGetDraftBiblePages } from "../../api-hooks/useGetDraftBiblePages";

ModuleRegistry.registerModules([AllCommunityModule]);

export const DraftBiblePagesTable = () => {
  const { data, isError, isLoading } = useGetDraftBiblePages();

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
          return (
            <Link
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
    <AgGridReact loading={isLoading} rowData={data} columnDefs={columnsDef} />
  );
};
