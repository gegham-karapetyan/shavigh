"use client";

import { Box, Stack } from "@mui/material";

import { Fragment, useState } from "react";
import { CreatePageHeader } from "@/frontend/admin-dashboard/components/CreatePagesHeader";
import { CreateSaintsBehaviorPage } from "@/frontend/admin-dashboard/components/CreateSaintsBehaviorPage";
import { DraftSaintsBehaviorPagesTable } from "@/frontend/admin-dashboard/components/data-grids/DraftSaintsBehaviorPagesTable";
import { UnusedSaintsBehaviorPagesTable } from "@/frontend/admin-dashboard/components/data-grids/UnusedSaintsBehaviorPagesTable copy";

export default function NewBiblePagesPage() {
  const [activeTab, setActiveTab] = useState<"draft" | "unused">("draft");
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  return (
    <Fragment>
      <Stack width="100%" height="100%" gap={2} px={1}>
        <CreatePageHeader
          createButtonTitle="Create Page"
          onCreateButtonClick={() => setIsOpenCreateModal(true)}
          tabs={[{ label: "draft" }, { label: "unused" }]}
          activeTab={activeTab}
          onTabSelect={(label) => setActiveTab(label as "draft" | "unused")}
        />

        <Box width="100%" flex={1} minHeight={0}>
          {activeTab === "draft" && <DraftSaintsBehaviorPagesTable />}
          {activeTab === "unused" && <UnusedSaintsBehaviorPagesTable />}
        </Box>
      </Stack>
      {isOpenCreateModal && (
        <CreateSaintsBehaviorPage onClose={() => setIsOpenCreateModal(false)} />
      )}
    </Fragment>
  );
}
