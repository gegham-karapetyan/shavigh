"use client";

import { Box, Stack } from "@mui/material";

import { Fragment, useState } from "react";
import { CreatePageHeader } from "@/frontend/admin-dashboard/components/CreatePagesHeader";
import { CreateBiblePage } from "@/frontend/admin-dashboard/components/CreateBiblePage";
import { DraftBiblePagesTable } from "@/frontend/admin-dashboard/components/data-grids/DraftBiblePagesTable";

export default function NewBiblePagesPage() {
  const [activeTab, setActiveTab] = useState("draft");
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  return (
    <Fragment>
      <Stack width="100%" height="100%" gap={2} px={1}>
        <CreatePageHeader
          createButtonTitle="Create Page"
          onCreateButtonClick={() => setIsOpenCreateModal(true)}
          tabs={[{ label: "draft" }]}
          activeTab={activeTab}
          onTabSelect={setActiveTab}
        />

        <Box width="100%" flex={1} minHeight={0}>
          {activeTab === "draft" && <DraftBiblePagesTable />}
        </Box>
      </Stack>
      {isOpenCreateModal && (
        <CreateBiblePage onClose={() => setIsOpenCreateModal(false)} />
      )}
    </Fragment>
  );
}
