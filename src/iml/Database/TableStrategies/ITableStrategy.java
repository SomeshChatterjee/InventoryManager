/*
 *  Created by Somesh Chatterjee.
 */
package iml.Database.TableStrategies;

import iml.Database.Codes.TableNames;
import java.sql.ResultSet;
import java.util.List;

/**
 *
 * @author somesh
 */
public interface ITableStrategy
{
    TableNames GetTableName();
    String CreateTableQuery();
    String CreateRecordQuery(List<Object> values);
    String ReadQuery();
    String UpdateQuery(List<Object> values);
    List<List<Object>> GetValuesFromResultSet(ResultSet resultSet);
}
