"use client";

import React, { useState } from "react";

interface ColumnProps<T> {
  title: string;
  dataIndex: keyof T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, record: T) => React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Column = <T extends Record<string, any>>(
  // eslint-disable-next-line
  props: ColumnProps<T>
) => {
  return null;
};

interface TableProps<T> {
  dataSource: T[];
  children: React.ReactElement<ColumnProps<T>>[];
  rowExpandable?: boolean;
  expandedIcon?: React.ReactNode;
  expandedRowRender?: (record: T) => React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Table = <T extends Record<string, any>>(props: TableProps<T>) => {
  const {
    dataSource,
    children,
    rowExpandable = false,
    expandedIcon = "+",
    expandedRowRender,
  } = props;
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});

  const toggleRowExpansion = (index: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <table className="min-w-full table-auto border-collapse">
      <thead className="bg-gray-100">
        <tr>
          {React.Children.map(children, (child) => (
            <th className="pb-2.5 text-center text-[12px] font-medium leading-4 text-[#9B9B9B]">
              {child.props.title}
            </th>
          ))}
          {rowExpandable && (
            <th className="text-center text-sm font-medium"></th>
          )}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((item, index) => (
          <React.Fragment key={index}>
            <tr
              className={` hover:bg-gray-50 ${
                expandedRows[index] ? "bg-gray-50" : ""
              }`}
            >
              {React.Children.map(children, (child) => (
                <td className="py-5 text-center text-sm font-medium leading-4 border-b border-[#E4E4E4]">
                  {child.props.render
                    ? child.props.render(item[child.props.dataIndex], item)
                    : item[child.props.dataIndex]}
                </td>
              ))}
              {rowExpandable && (
                <td className="text-center text-sm font-medium">
                  <button
                    className={`transform transition-transform ${
                      expandedRows[index] ? "rotate-90" : ""
                    }`}
                    onClick={() => toggleRowExpansion(index)}
                  >
                    {expandedIcon}
                  </button>
                </td>
              )}
            </tr>
            {rowExpandable && expandedRows[index] && expandedRowRender && (
              <tr className="bg-gray-50">
                <td
                  colSpan={React.Children.count(children) + 1}
                  className="px-4 py-2"
                >
                  {expandedRowRender(item)}
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};
