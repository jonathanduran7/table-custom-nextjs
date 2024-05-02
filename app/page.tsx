'use client'
import CustomTable from "./components/table/Table";
import { columns } from "./data/columns";
import { data } from "./data/data";

export default function Home() {

  const styleRow = {
    '&:hover': {
      backgroundColor: '#9f9f9f'
    },
  }

  const styleHeader = {
    backgroundColor: '#000',
    color: '#fff',
  }

  return (
    <main>
      <div
        style={{ border: '1px solid #000', minHeight: '200px' }}
      >
        <CustomTable
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
