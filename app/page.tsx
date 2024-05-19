'use client'
import { useState } from "react";
import { columns } from "./data/columns";
import { data as fakeData } from "./data/data";
import TableCompound from "./components/compound/Table";
import { styleHeader, styleRow } from "./styles.table";
import { TableConfig } from "./interface/table-config.interface";

export default function Home() {

  const [data, setData] = useState(fakeData)

  const tableConfig: TableConfig = {
    hasCheckboxes: true,
    hasOrder: true,
  }

  const handleOrderColumn = (keyColumn: string) => {
    // here i can call api for order data
    console.log(keyColumn);
    return [{id: 1, nombre: 'jonathan'}]
  }

  const ordersColumn = []

  return (
    <main>
      <div style={{ minHeight: '200px' }}>
        <TableCompound columns={columns} data={data} tableConfig={tableConfig}>
          <TableCompound.Head 
              stylesHeader={styleHeader} 
              deafultOrder="asc" 
              //customOrder={{handleOrderColumn}} 
          />
          <TableCompound.Body stylesRow={styleRow} />
        </TableCompound>
      </div>
    </main>
  );
}
