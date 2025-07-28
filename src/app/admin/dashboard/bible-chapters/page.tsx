"use client";

import { Box, Stack } from "@mui/material";

import { Fragment, useState } from "react";
import { CreatePageHeader } from "@/frontend/admin-dashboard/components/CreatePagesHeader";
import { DraftBibleChaptersTable } from "@/frontend/admin-dashboard/components/data-grids/DraftBibleChaptersTable";
import { CreateBibleChapter } from "@/frontend/admin-dashboard/components/CreateBibleChapter";

export default function NewBibleChaptersPage() {
  const [activeTab, setActiveTab] = useState("draft");
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  return (
    <Fragment>
      <Stack width="100%" height="100%" gap={2} px={1}>
        <CreatePageHeader
          createButtonTitle="Create Chapter"
          onCreateButtonClick={() => setIsOpenCreateModal(true)}
          tabs={[{ label: "draft" }]}
          activeTab={activeTab}
          onTabSelect={setActiveTab}
        />

        <Box width="100%" flex={1} minHeight={0}>
          {activeTab === "draft" && <DraftBibleChaptersTable />}
        </Box>
      </Stack>
      {isOpenCreateModal && (
        <CreateBibleChapter onClose={() => setIsOpenCreateModal(false)} />
      )}
    </Fragment>
  );
}
