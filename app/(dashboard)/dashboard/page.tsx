import KeyChart from '@/components/dashboard/key-chart';
import TotalStatusPieChart from '@/components/dashboard/total-status-pie-chart';
import { DataTable } from '@/components/dashboard/data-table';
import { getKeyStatusSummary, getBorrowedKeysTableData } from '@/app/actions/dashboard';
import { columns } from '@/components/dashboard/columns';

export default async function Page() {
  const keyChartData = await getKeyStatusSummary();
  const borrowedKeysData = await getBorrowedKeysTableData();
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <TotalStatusPieChart data={keyChartData} />
              <KeyChart data={keyChartData} />
            </div>
          </div>
          <DataTable columns={columns} data={borrowedKeysData} />
        </div>
      </div>
    </div>
  );
}
