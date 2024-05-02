'use client'
import CustomTable from "./components/table/Table";
import { columns } from "./data/columns";
import { data } from "./data/data";

export default function Home() {

  const styleRow = {
    '&:hover': {
      backgroundColor: '#eeeeee'
    },
  }

  const styleHeader = {
    // backgroundColor: '#000',
    color: '#000',
  }

  return (
    <main>
      <div
        style={{ minHeight: '200px' }}
      >
        <CustomTable
          checkbox={true}
          tableOptions={{ stickyHeader: true }}
          stylesRow={styleRow}
          stylesHeader={styleHeader}
          columns={columns}
          data={data}
        />
      </div>
    </main>
  );
}
