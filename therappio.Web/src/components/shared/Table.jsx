import React from 'react';
import PropTypes from 'prop-types';
import { useTable } from 'react-table';

const defaultPropGetter = () => ({});

const Table = ({
    columns,
    data,
    getHeaderProps = defaultPropGetter,
    getColumnProps = defaultPropGetter,
    getRowProps = defaultPropGetter,
    getCellProps = defaultPropGetter,
}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    });

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                // Return an array of prop objects and react-table will merge them appropriately
                                {...column.getHeaderProps([
                                    {
                                        className: column.className,
                                        style: column.style,
                                    },
                                    getColumnProps(column),
                                    getHeaderProps(column),
                                ])}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        // Merge user row props in
                        <tr {...row.getRowProps(getRowProps(row))}>
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        // Return an array of prop objects and react-table will merge them appropriately
                                        {...cell.getCellProps([
                                            {
                                                className:
                                                    cell.column.className,
                                                style: cell.column.style,
                                            },
                                            getColumnProps(cell.column),
                                            getCellProps(cell),
                                        ])}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.array.isRequired,
    getHeaderProps: PropTypes.func.isRequired,
    getColumnProps: PropTypes.func.isRequired,
    getRowProps: PropTypes.func.isRequired,
    getCellProps: PropTypes.func.isRequired,
};

Table.defaultProps = {
    getHeaderProps: () => ({}),
    getColumnProps: () => ({}),
    getRowProps: () => ({}),
    getCellProps: () => ({}),
};

export default Table;
