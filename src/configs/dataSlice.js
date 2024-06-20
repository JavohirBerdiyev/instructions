import { create } from 'zustand';
import { devtools } from "zustand/middleware";

const useStoreTable = create(devtools((set) => ({
  tableData: {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
      order: '',
      key: '',
    },
  },

  setTableData: (tableData) => set({ tableData }),
}))
);

export default useStoreTable;
