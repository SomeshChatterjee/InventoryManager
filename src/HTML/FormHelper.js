/* 
 *  Created by Somesh Chatterjee.
 */

var FormHelper = (function ()
{  
    var NaText = "N/A";
    var dateFormat = 'M d, yy';
    var MergedArraySeperator = " -- ";
    
    function SetupDropdown(componentId, list)
    {      
        var uniqueValues = GetUniqueValuesFrom(list);      
        
        $(componentId).autocomplete( {
                    source: uniqueValues
                });
    };
    
    function SetupDatePicker(componentId)
    {
        $(componentId).datepicker({ dateFormat: dateFormat });
    }
    
    function SetupDataTableWrapper(infoTable, idForFieldEnablingHiddenColumns)
    {
        SetupDataTableWrapperWithSort(infoTable, idForFieldEnablingHiddenColumns, 0, "asc");
    }
    
    function SetupDataTableWrapperWithSort(infoTable, idForFieldEnablingHiddenColumns, columnNumber, sortOrder)
    {
        var tableHeaders = infoTable.Data.TableHeader;
        
        $(document).ready(function() {
            var index = 0;
            var table = $("#" + infoTable.TableId).DataTable({
                "data" : infoTable.Data.TableData,
                "scrollX" : true,
                "deferRender": true,
                "aaSorting": [[columnNumber, sortOrder]],
                initComplete: function () {
                            this.api().columns().every( function () {
                                var column = this;
                                var id = "DataTableFilterCol" + index;
                                index++;
                                var select = $("<select id='" + id + "'><option value=''></option></select>")
                                    .appendTo( $(column.header()) )
                                    .on( 'change', function () {
                                        var val = $.fn.dataTable.util.escapeRegex(
                                            $(this).val()
                                        );

                                        column
                                            .search( val ? '^'+val+'$' : '', true, false )
                                            .draw();
                                    } )
                                    .on( 'click', function (e) {
                                        e.stopPropagation();
                                    } );

                                column.data().unique().sort(SortFunction).each( function ( d, j ) {
                                    select.append( '<option value="'+d+'">'+d+'</option>' );
                                } );
                            } );
                        }                
            });
            SetupAddRemoveColumns(infoTable, table, tableHeaders, idForFieldEnablingHiddenColumns);
        });
    }
    
    function SortFunction(a, b)
    {
        if (Number(a) == a && Number(b) == b)
        {
            return CheckIfFirstGreater(Number(a), Number(b));
        }
        
        var convertedADate = new Date(a);
        var convertedBDate = new Date(b);
        if (isNaN(convertedADate.getTime()) === false && isNaN(convertedBDate.getTime()) === false)
        {
            return CheckIfFirstGreater(convertedADate, convertedBDate);
        }   
        return CheckIfFirstGreater(a, b);
    }
    
    function CheckIfFirstGreater(a, b)
    {
        if (a > b) 
        {
          return 1;
        }
        if (a < b)
        {
          return -1;
        }
        // a must be equal to b
        return 0;
    }
    
    function SetupAddRemoveColumns(infoTable, table, tableHeader, idForFieldEnablingHiddenColumns)
    {
        if (idForFieldEnablingHiddenColumns === "")
        {
            return;
        }
        
        var divForAddRemove = new HTMLElement("div", "", []);
        var colsToShow = infoTable.GetTableColsToShowByDefault();
        
        divForAddRemove.AddContent("Additional Columns to show: <br>");
        for (var i = 0; i < tableHeader.length; i++)
        {
            if (colsToShow.indexOf(tableHeader[i]) === -1)
            {
                var anchor = new HTMLElement("a", "", ["toggle-vis"]);
                anchor.AddAttribute("data-column='" + i + "'");
                anchor.AddContent("-" + tableHeader[i]);
                divForAddRemove.AddContent(anchor.GetElement());
                
                ToggleColumnVisibility(table, i);
            }
        }
        
        DomFunctions.$(idForFieldEnablingHiddenColumns)[0].innerHTML = divForAddRemove.GetElement();
        
        $('a.toggle-vis').on( 'click', function (e) {
            e.preventDefault();
            ToggleColumnVisibility(table, $(this).attr('data-column'));
        } );                    
    }
    
    function ToggleColumnVisibility(table, columnNumber)
    {
        var column = table.column(columnNumber);
        column.visible( ! column.visible() );        
    }    
    
    function GetDataValuesFromTable(table, columnIndex)
    {
        var tableData = table.TableData;
        return GetDataValuesFromDoubleArray(tableData, columnIndex);
    }
    
    function GetDataValuesFromDoubleArray(array, columnIndex)
    {
        var values = [];
        var tableData = array;
        for (var i = 0; i < tableData.length; ++i)
        {
            values.push(tableData[i][columnIndex]);
        }
        return values;        
    }
    
    function SetupDefaultValues(addVerification)
    {
        SetupEmptyStringValue();
        SetupDefaultStringValue(addVerification);
        SetupDefaultNumericValueUsing(false, addVerification);
        SetupDefaultNumericValueUsing(true, addVerification);
        SetupDefaultDate(addVerification);
    }
    
    function SetupDefaultDate(addVerification)
    {
        var className = ".DefaultDate";
        var defaultValue = $.datepicker.formatDate(dateFormat, new Date());        
        
        $(className).val(defaultValue);
        if (addVerification)
        {
            $(className).blur(function ()
            {
                this.value = CheckIfValidDate(this.value);
                this.value = SetDefaultValueIfEmpty(this.value, defaultValue);
            });            
        }        
    }
    
    function CheckIfValidDate(dateValue)
    {
        var convertedDateValue = new Date(dateValue);
        var indexOfSeperator = dateValue.indexOf("/");
        if (indexOfSeperator !== -1)
        {
            var bits = dateValue.split("/");
            if (bits.length === 3)
            {
                convertedDateValue = new Date(bits[2], bits[1] - 1, bits[0], 0, 0, 0, 0);
            }
            else
            {
                convertedDateValue = new Date("Invalid");
            }
        }

        if (isNaN(convertedDateValue.getTime()))
        {
            dateValue = "";
        }
        else
        {
            dateValue = $.datepicker.formatDate(dateFormat, convertedDateValue);
        }

        return dateValue;
    }
    
    function SetupDefaultStringValue(addVerification)
    {
        var className = ".DefaultNA";
        var defaultValue = NaText;
        
        $(className).val(defaultValue);
        if (addVerification)
        {
            $(className).blur(function ()
            {
                this.value = SetDefaultValueIfEmpty(this.value, defaultValue);
            });            
        }
    }
    
    function SetupEmptyStringValue()
    {
        var className = ".DefaultEmpty";
        var defaultValue = "";
        $(className).val(defaultValue);
    }
    
    function SetDefaultValueIfEmpty(value, defaultValue)
    {
        if(value.length === 0)
        {
            value = defaultValue;
        }    
        return value;
    }
    
    function SetupDefaultNumericValueUsing(isFloat, addVerification)
    {
        var className = isFloat ? ".DefaultFloatZero" : ".DefaultZero";
        var defaultValue = 0;
        
        $(className).val(defaultValue);
        if (addVerification)
        {
            $(className).blur(function ()
            {
                this.value = CheckForValidNumberAndFloat(this.value, isFloat);
                this.value = SetDefaultValueIfEmpty(this.value, defaultValue);
            });                    
        }
    }
    
    function CheckForValidNumberAndFloat(valueOfField, isFloat)
    {
        var valueInNumber = Number(valueOfField);
        if ((valueInNumber == valueOfField) && (valueInNumber >= 0))
        {
            if (!isFloat)
            {
                valueOfField = valueOfField - valueOfField % 1;
            }
        }
        else
        {
            valueOfField = "";
        }        
        return valueOfField;
    }
    
    function SetupEditableComboBox(idOfSelect, idOfText)
    {
        $(idOfSelect).change(function ()
        {
            $(idOfText).val($(idOfSelect + " option:selected").html());
            $(idOfText).blur(); // trigger any associated event handler.
        });
        $(idOfText).blur(function ()
        {
            var value = $(idOfText).val();
            var possibleValues = $(idOfSelect + " > option").map(function ()
            {
                return this.value;
            }).get();
            if (possibleValues.indexOf(value) === -1)
            {
                $(idOfText).val("");
            }
        });
    }
    
    function SetupComboBox(idOfCombobox, dataArray)
    {
        var comboBox = $(idOfCombobox);
        comboBox.empty();
        var sortedData = GetUniqueValuesFrom(dataArray);
        sortedData.sort();
        for (var i = 0; i < sortedData.length; i++)
        {
            var value = sortedData[i];
            comboBox.append( '<option value="'+ value +'">'+value+'</option>' );
        }
    }
    
    function GetUniqueValuesFrom(array)
    {
        var uniqueValues = [];
        for (var i = 0; i < array.length; ++i)
        {
            if (uniqueValues.indexOf(array[i]) === -1)
            {
                uniqueValues.push(array[i]);
            }
        } 
        return uniqueValues;
    }
    
    function MergeArraysForCombinedField(arrayValues1, arrayValues2)
    {
        var resultArray = [];
        for (var i = 0; i < arrayValues1.length; ++i)
        {
            resultArray.push(arrayValues1[i] + MergedArraySeperator + arrayValues2[i]);
        }
        return resultArray;
    }
    
    function MergeArrayWithMultiValuesForCombinedFiled(arrayValues)
    {
        var resultArray = [];
        for (var i = 0; i < arrayValues.length; ++i)
        {
            var row = arrayValues[i];
            var value = "";
            for (var j = 0; j < row.length; ++j)
            {
                value = value + "" + row[j];
                if (j < row.length - 1)
                {
                    value = value + "" +  MergedArraySeperator;                   
                }
            }
            resultArray.push(value);
        }
        return resultArray;        
    }
    
    function GetIndexIfDuplicate(values, arrays)
    {
        for (var i = 0; i < arrays[0].length; i++)
        {
            var valueMatched = true;
            for (var j = 0; j < values.length; j++)
            {
                var valueInArray = arrays[j][i];
                var valueToVerify = values[j];
                if (valueInArray.toUpperCase() !== valueToVerify.toUpperCase())
                {
                    valueMatched = false;
                    break;
                }
            }
            if (valueMatched)
            {
                return i;
            }
        }
        return -1;
    }
    
    function AddNewRow(infotable, newRow, id)
    {
        if (infotable.Data.TableData[0].length !== newRow.length)
        {
            alert("Invalid set of data, columns count do not match");
        }
        else
        {
            var rowNumber = Number(id) - 1;
            if (rowNumber === infotable.Data.TableData.length)
            {
                infotable.Data.TableData.push(newRow);
            }
            else
            {
                infotable.Data.TableData[rowNumber] = newRow;
            }
        }
    };    
    
    function UpdateDataTableWith(infoTable, newRow, id)
    {
        var lastId = infoTable.Data.TableData.length;
        
        AddNewRow(infoTable, newRow, id);
        var table = $("#" + infoTable.TableId);
        var dataTable = table.DataTable();
        
        if (id > lastId)
        {
            dataTable.row.add(newRow).draw(false);                
        }
        else
        {
            var rowNumber = Number(id) - 1;
            table.dataTable().fnUpdate(newRow, rowNumber);            
        }

        dataTable.columns().every( function () 
        {
            var select = $(this.header()).children("select");
            var preselectedValue = select.val();
            select.empty();
            select.append( '<option value=""></option>' );
            this.data().unique().sort(SortFunction).each( function ( d, j ) 
            {
                select.append( '<option value="'+d+'">'+d+'</option>' );
            });
            select.val(preselectedValue);
            if (select.val() === null) // existing record deleted
            {
                select.append( '<option value="'+preselectedValue+'">'+preselectedValue+'</option>' );
                select.val(preselectedValue);
            }
        });
    }
    
    function BindEventWith(eventName, idOfControl, action)
    {
        $("#" + idOfControl).unbind(eventName, action);
        $("#" + idOfControl).bind(eventName, action);
    }    
    
    function GetIndexOfValueFromTable(table, columnNumber, valueToFind)
    {
        for (var i = 0; i < table.length; ++i)
        {
            if (table[i][columnNumber] === valueToFind)
            {
                return i;
            }
        }
        return -1;
    }
    
    function CheckIfInputHasValue(input)
    {
        return ((input === "") || 
                (input.toUpperCase() === NaText) ||
                (!input.trim()));
    }
    
    return {
        SetupDropdown : SetupDropdown,
        GetDataValuesFromTable: GetDataValuesFromTable,
        GetDataValuesFromDoubleArray: GetDataValuesFromDoubleArray,
        SetupDatePicker: SetupDatePicker,
        SetupDataTableWrapper: SetupDataTableWrapper,
        SetupDataTableWrapperWithSort: SetupDataTableWrapperWithSort,
        SetupDefaultValues: SetupDefaultValues,
        SetupEditableComboBox: SetupEditableComboBox,
        SetupComboBox: SetupComboBox,
        MergeArraysForCombinedField: MergeArraysForCombinedField,
        GetIndexIfDuplicate: GetIndexIfDuplicate,
        UpdateDataTableWith: UpdateDataTableWith,
        BindEventWith: BindEventWith,
        NaText: NaText,
        MergedArraySeperator: MergedArraySeperator,
        MergeArrayWithMultiValuesForCombinedFiled: MergeArrayWithMultiValuesForCombinedFiled,
        GetIndexOfValueFromTable: GetIndexOfValueFromTable,
        CheckIfInputHasValue: CheckIfInputHasValue
    };
    
})();