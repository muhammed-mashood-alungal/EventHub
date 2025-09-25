import React from "react";
import { Table } from "@chakra-ui/react";
import type { IPagination, TableColumn } from "../../types/common.types";

interface ReusableTableProps {
  data: any[];
  columns: TableColumn[];
  pagination?: IPagination | null;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  data,
  columns,
}) => {
  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row bg={"gray.100"} border={0}>
            <Table.ColumnHeader>#</Table.ColumnHeader>
            {columns.map((col) => (
              <Table.ColumnHeader key={col.accessor} color={"black"}>
                {col.header}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.map((row, idx) => (
            <Table.Row key={idx} bg={"gray.100"} color={"black"} border={0}>
              <Table.Cell fontWeight="medium" border={0}>
                {idx + 1}
              </Table.Cell>
              {columns.map((col) => (
                <Table.Cell border={0} key={col.accessor}>
                  {col.render
                    ? col.render(row[col.accessor], row)
                    : row[col.accessor]}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default ReusableTable;
