import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination, useExpanded } from 'react-table';
import { useEffect } from 'react';

const defaultPropGetter = () => ({});

const Table = ({
    columns,
    data,
    getHeaderProps = defaultPropGetter,
    getColumnProps = defaultPropGetter,
    getRowProps = defaultPropGetter,
    getCellProps = defaultPropGetter,
    renderRowSubComponent = defaultPropGetter,
}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        setPageSize,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        flatColumns,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        useExpanded,
        usePagination
    );
    const [visiblePages, setVisiblePages] = useState([1]);

    const filterPages = (visiblePages, totalPages) => {
        return visiblePages.filter(page => page <= totalPages);
    };

    const getVisiblePages = (newPage, total) => {
        if (total < 5) {
            return filterPages([1, 2, 3, 4], total);
        } else if (newPage % 3 >= 0 && newPage > 2 && newPage + 3 <= total) {
            return [1, newPage - 1, newPage, newPage + 1, total];
        } else if (newPage % 3 >= 0 && newPage > 2 && newPage + 2 === total) {
            return [1, newPage - 2, newPage - 1, newPage, total];
        } else {
            return [1, 2, total - 1, total];
        }
    };

    const changePage = newIndex => {
        console.log(
            'newIndex',
            newIndex,
            'pageIndex',
            pageIndex,
            'pageCount',
            pageCount,
            'change page'
        );
        if (newIndex === pageIndex) {
            return;
        }

        const newVisiblePages = getVisiblePages(newIndex + 1, pageCount);
        setVisiblePages(filterPages(newVisiblePages, pageCount));
        gotoPage(newIndex > 0 ? newIndex : 0);
    };

    useEffect(() => {
        setVisiblePages(getVisiblePages(null, pageCount));
    }, [pageCount]);

    useEffect(() => {
        setPageSize(5);
    }, []);

    return (
        <>
            <div className="pagination">
                <button
                    onClick={() => changePage(pageIndex - 1)}
                    disabled={!canPreviousPage}
                    className="page-btn-active"
                >
                    {'<'}
                </button>
                {visiblePages.map((page, index, array) => {
                    // let ellipsis = '...';
                    // if (pageCount < 5) ellipsis = '';

                    // return array[index - 1] + 2 < page ? (
                    //     <span>`...`</span>
                    // ) : (
                    return (
                        <button
                            key={page}
                            className={
                                pageIndex === page - 1
                                    ? 'page-btn-active'
                                    : 'page-btn'
                            }
                            onClick={() => changePage(page - 1)}
                        >
                            {
                                /* {array[index - 1] + 2 < page ? `...${page}` : page} */ page
                            }
                        </button>
                    );
                })}
                <button
                    onClick={() => changePage(pageIndex + 1)}
                    disabled={!canNextPage}
                    className="page-btn-active"
                >
                    {'>'}
                </button>
                {/* <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span> */}
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            gotoPage(page);
                        }}
                    />
                </span>{' '}
            </div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
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
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <React.Fragment
                                {...row.getRowProps(getRowProps(row))}
                            >
                                <tr className="row">
                                    {row.cells.map(cell => {
                                        return (
                                            <td
                                                {...cell.getCellProps([
                                                    {
                                                        className:
                                                            cell.column
                                                                .className,
                                                        style:
                                                            cell.column.style,
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
                                {row.isExpanded ? (
                                    <tr className="expanded-row">
                                        <td colSpan={flatColumns.length}>
                                            {/*
                                              Inside it, call our renderRowSubComponent function. In reality,
                                              you could pass whatever you want as props to
                                              a component like this, including the entire
                                              table instance. But for this example, we'll just
                                              pass the row
                                            */}
                                            {renderRowSubComponent({ row })}
                                        </td>
                                    </tr>
                                ) : (
                                    <tr />
                                )}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.array.isRequired,
    getHeaderProps: PropTypes.func.isRequired,
    getColumnProps: PropTypes.func.isRequired,
    getRowProps: PropTypes.func.isRequired,
    getCellProps: PropTypes.func.isRequired,
    renderRowSubComponent: PropTypes.func,
};

Table.defaultProps = {
    getHeaderProps: () => ({}),
    getColumnProps: () => ({}),
    getRowProps: () => ({}),
    getCellProps: () => ({}),
};

export default Table;
