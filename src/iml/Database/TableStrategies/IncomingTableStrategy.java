/*
 *  Created by Somesh Chatterjee.
 */
package iml.Database.TableStrategies;

import iml.Database.Codes.TableNames;
import java.sql.ResultSet;

/**
 *
 * @author somesh
 */
public class IncomingTableStrategy implements ITableStrategy
{

    @Override
    public TableNames GetTableName()
    {
        return TableNames.Incoming;
    }

    @Override
    public String CreateTableQuery()
    {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String CreateRecordQuery(Object[] values)
    {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String ReadQuery()
    {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String UpdateQuery(Object[] values)
    {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Object[][] GetValuesFromResultSet(ResultSet resultSet)
    {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
