'use client'
import { useState } from "react";
import { columns } from "./data/columns";
import { data as fakeData } from "./data/data";
import TableCompound from "./components/compound/Table";
import { styleHeader, styleRow } from "./styles.table";
import { TableConfig } from "./interface/table-config.interface";
import { fakeSortService } from "./services/fake-sort.service";
import { IAction } from "./interface/actions.interface";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Home() {

  const [data, setData] = useState(fakeData)

  const tableConfig: TableConfig = {
    hasCheckboxes: true,
    hasOrder: true,
    hasActions: true
  }

  const handleOrderColumn = async (keyColumn: string, order: 'asc' | 'desc') => {
    return fakeSortService(keyColumn, order)
  }

  //TODO: check if this is necessary
  const ordersColumn = []

  const actions: IAction[] = [
    {
      label: 'Editar',
      action: (row) => console.log('Edit action', row.id),
      icon: <EditIcon />
    },
    {
      label: 'Eliminar',
      action: (row) => console.log('Delete action', row.id),
      icon: <DeleteIcon />
    }
  ]

  return (
    <main>
      <div style={{ minHeight: '200px' }}>
        <TableCompound columns={columns} data={data} tableConfig={tableConfig}>
          <TableCompound.Head
            stylesHeader={styleHeader}
            deafultOrder="asc"
          //customOrder={{ handleOrderColumn }}
          />
          <TableCompound.Body stylesRow={styleRow} actions={actions} />
        </TableCompound>
      </div>
    </main>
  );
}
