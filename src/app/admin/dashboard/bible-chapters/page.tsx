"use client";

import { STATUS_CODES } from "@/constants";
import { GetBibleDynamicPageModel } from "@/http-api/interfaces/site-pages.models";
import { useQuery } from "@tanstack/react-query";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);
import axios, { AxiosError } from "axios";
// import { useState } from "react";

const useGetDraftBibleChapters = () => {
  return useQuery({
    queryKey: ["GET_DRAFT_BIBLE_CHAPTERS_QUERY_KEY"],
    queryFn: async () => {
      const { data } = await axios.get<GetBibleDynamicPageModel[]>(
        "/api/site-preview/bible/chapter-or-page/drafts",
        {
          params: {
            pageType: "chapter",
          },
        }
      );
      console.log(data);
      return data;
    },
    refetchOnWindowFocus: false,
  });
};

export default function NewBibleChaptersPage() {
  const { data, error } = useGetDraftBibleChapters();
  console.log(data);

  // const [rowData, setRowData] = useState([
  //   { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  //   { make: "Ford", model: "F-Series", price: 33850, electric: false },
  //   { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  //   { make: "Mercedes", model: "EQA", price: 48890, electric: true },
  //   { make: "Fiat", model: "500", price: 15774, electric: false },
  //   { make: "Nissan", model: "Juke", price: 20675, electric: false },
  // ]);
  // const [columnDefs, setColumnDefs] = useState([
  //   {
  //     headerName: "Make & Model",
  //     valueGetter: (p) => p.data.make + " " + p.data.model,
  //     flex: 2,
  //   },
  //   {
  //     field: "price",
  //     valueFormatter: (p) => "£" + Math.floor(p.value).toLocaleString(),
  //     flex: 1,
  //   },
  //   { field: "electric", flex: 1 },
  //   { field: "button", cellRenderer: () => <div>sdfgh</div>, flex: 1 },
  // ]);
  console.log("errror", error);

  if (error) {
    if ((error as AxiosError).status === STATUS_CODES.NOT_FOUND) {
      return <div>NO DATA</div>;
    } else {
      return <div>Error</div>;
    }
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "100%" }}>
        {/* <AgGridReact rowData={rowData} columnDefs={columnDefs} /> */}
      </div>
    </div>
  );
}
