import React, { useRef } from 'react';
import './style.css';
import { downloadAsExcelWithHeadings } from '../../utils/XLS/jsonexcel';
/* import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'; */

import { ReactComponent as ExcellSVG } from '../../assets/excell.svg';
import { ReactComponent as PDFSVG } from '../../assets/pdf.svg';

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditfactory from 'react-bootstrap-table2-editor';

import paginationFactory from 'react-bootstrap-table2-paginator';
import jspdf from 'jspdf';
import 'jspdf-autotable';

import { SecurityConfig } from '../../services/SecurityConfig';

const CustomTable = ({ tableid, fieldKey, customcolumns, customdata, validateNewValue, onValidateErrorEvent, orientation, disableExport, customdiv, exportFileName, pdfTableHeaderID, excelHeaders }) => {

    const tableRef = useRef(null);

    const saveAsXLS = () => {
        let mycols = [];
        let myrefCols = {};
        let mydata = [];

        Object.keys(tableRef.current.props.columns).map((k, v) => {
            if (tableRef.current.props.columns[v].hidden == null || tableRef.current.props.columns[v].hidden == false) {
                mycols.push(tableRef.current.props.columns[v].text);
                myrefCols[tableRef.current.props.columns[v].text] = tableRef.current.props.columns[v].dataField;
            }
        })

        Object.keys(tableRef.current.props.data).map((k, v) => {
            let dicInside = [];
            Object.keys(mycols).map((k2, v2) => {
                dicInside.push(tableRef.current.props.data[v][myrefCols[mycols[v2]]]);
            })
            mydata.push(dicInside);
        })

        downloadAsExcelWithHeadings(excelHeaders, mycols, mydata, exportFileName);
    }


    const mountJostHeader = (doc) => {
        doc.autoTable({
            html: `#${pdfTableHeaderID}`,
            margin: {
                top: 50, bottom: 0
            },
            headerStyles: {
                fillColor: [255, 255, 255],
                fontSize: 14,
                fontWeight: 300
            },
            bodyStyles: {
            },
            columnStyles: {
                0: {
                    cellWidth: 115,
                    fillColor: [255, 255, 255],
                    lineColor: [0, 0, 0],
                    lineWidth: 1,
                    valign: 'middle',
                    halign: 'center'
                },
                1: {
                    cellWidth: 'auto',
                    fillColor: [255, 255, 255],
                    lineColor: [0, 0, 0],
                    lineWidth: 1,
                    valign: 'middle',
                    halign: 'center'
                },
                2: {
                    cellWidth: 'auto',
                    fillColor: [255, 255, 255],
                    lineColor: [0, 0, 0],
                    lineWidth: 1,
                    valign: 'middle',
                    halign: 'center'
                },
                3: {
                    cellWidth: 'auto',
                    fillColor: [255, 255, 255],
                    lineColor: [0, 0, 0],
                    lineWidth: 1,
                    valign: 'middle',
                    halign: 'center'
                },
                4: {
                    cellWidth: 'auto',
                    fillColor: [255, 255, 255],
                    lineColor: [0, 0, 0],
                    lineWidth: 1,
                    valign: 'middle',
                    halign: 'center'
                }
            },
            willDrawCell: function (data) {

            },
            didDrawCell: function (data) {

                if (data.cell.section === 'body') {
                    var td = data.cell.raw;
                    var img = td.getElementsByTagName('img')[0];

                    if (img != null) {
                        doc.addImage(img.src, data.cell.x + 2, data.cell.y + 15, img.width, img.height);
                    }
                }
            }
        });
    }

    const saveAsPDF = () => {

        var doc = new jspdf(orientation != null ? orientation : 'l', 'pt');

        var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

        doc.page = 1;
        var totalPagesExp = "{total_pages_count_string}";

        var tableHeader = () => {
            mountJostHeader(doc);
        }

        var tableFooter = () => {
            doc.setFontSize(10);
            doc.text(pageWidth - 100, pageHeight - 10, `Pagina: ${doc.page}/${totalPagesExp}`);
            doc.page++;
        }

        var opt = {
            beforePageContent: tableHeader,
            afterPageContent: tableFooter,
            margin: { top: 180, bottom: 30 }
        }

        let mycols = [];
        let myrefCols = {};
        let mydata = [];

        Object.keys(tableRef.current.props.columns).map((k, v) => {
            if (tableRef.current.props.columns[v].hidden == null || tableRef.current.props.columns[v].hidden == false) {
                mycols.push(tableRef.current.props.columns[v].text);
                myrefCols[tableRef.current.props.columns[v].text] = tableRef.current.props.columns[v].dataField;
            }
        })

        Object.keys(tableRef.current.props.data).map((k, v) => {
            let dicInside = [];
            Object.keys(mycols).map((k2, v2) => {
                dicInside.push(tableRef.current.props.data[v][myrefCols[mycols[v2]]]);
            })
            mydata.push(dicInside);
        })

        //var res = doc.autoTableHtmlToJson(elem);
        //doc.autoTable(res.columns, res.data, opt);
        doc.autoTable(mycols, mydata, opt);
        if (typeof doc.putTotalPages === 'function') {
            doc.putTotalPages(totalPagesExp);
        }
        doc.save(`${exportFileName + new Date().getTime()}.pdf`);
    }

    function rowClassNameFormat(row, rowIdx) {
        return rowIdx % 2 === 0 ? 'td-alternate-color-x' : 'td-alternate-color-y';
    }

    return (
        <div>
            { customdata != null && customcolumns != null
                ?

                <div style={{ backgroundColor: "#FFF", marginTop: "10px" }}>
                    <BootstrapTable
                        ref={tableRef}
                        bootstrap4
                        id={tableid ?? "table-to-xls"}
                        keyField={fieldKey != null ? fieldKey : "id"}
                        columns={customcolumns}
                        data={customdata}
                        pagination={paginationFactory()}
                        noDataIndication="Table Empty"
                        rowClasses={rowClassNameFormat}
                        cellEdit={cellEditfactory({
                            mode: "click",
                            beforeSaveCell(oldValue, newValue, row, column, done) {
                                setTimeout(() => {
                                    SecurityConfig.writeLogs("*CustomTable*", `old value: ${oldValue} new value: ${newValue}`);
                                    if (validateNewValue(row, newValue)) {
                                        done();
                                    }
                                    else {
                                        onValidateErrorEvent();
                                    }

                                }, 0);
                                return { async: true };
                            }
                        })} />

                    {disableExport ? "" : <div>
                        <button onClick={() => saveAsXLS()} className="btn btn-scale"><i><ExcellSVG width={31} height={31} fill="#000" opacity="0.5" /> </i></button>
                        <button onClick={() => saveAsPDF()} className="btn btn-scale"><i><PDFSVG width={31} height={31} fill="#000" opacity="0.5" /> </i></button>
                    </div>}

                    {customdiv}

                </div>
                : ""}
        </div >
    )
}

export default CustomTable;