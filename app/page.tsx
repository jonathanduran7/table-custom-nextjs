'use client'
import { useState } from "react";
import { columns } from "./data/columns";
import { data as fakeData } from "./data/data";
import TableCompound from "./components/compound/Table";

export default function Home() {

  const [data, setData] = useState(fakeData)

  const styleRow = {
    '&:hover': {
      backgroundColor: '#eeeeee'
    },
  }

  const styleHeader = {
    backgroundColor: '#dcdcdc',
    color: '#000',
  }

  return (
    <main>
      <div style={{ minHeight: '200px' }}>
        <TableCompound columns={columns} data={data} hasCheckboxes={true}>
          <TableCompound.Head stylesHeader={styleHeader} />
          <TableCompound.Body stylesRow={styleRow} />
        </TableCompound>
      </div>
    </main>
  );
}
