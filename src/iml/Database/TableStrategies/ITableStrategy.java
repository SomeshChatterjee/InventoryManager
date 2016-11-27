/*
 *  Created by Somesh Chatterjee.
 */
package iml.Database.TableStrategies;

import iml.Database.Codes.TableNames;
import java.sql.ResultSet;
import org.json.simple.JSONArray;

/**
 *
 * @author somesh
 */
public interface ITableStrategy
{
    TableNames GetTableName();
    String CreateTableQuery();
    String CreateRecordQuery(Object[] values);
    String ReadQuery();
    String UpdateQuery(int id, Object[] values);
    Object[][] GetValuesFromResultSet(ResultSet resultSet);
    Object[] GetObjectArrayFromJSONArray(JSONArray jsonArray);
}
