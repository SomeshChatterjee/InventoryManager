/*
 *  Created by Somesh Chatterjee.
 */
package iml.Database;
import Logger.ExitProgram;
import Logger.EventLogger;
import Logger.EventLoggerCodes;
import iml.Database.Codes.DatabaseName;
import iml.Database.TableStrategies.ITableStrategy;
import java.sql.*;
/**
 *
 * @author somesh
 */
public class DatabaseAccessor
{
    private final EventLogger _eventLogger;
    private static DatabaseAccessor _databaseAccessor;

    private DatabaseAccessor()
    {
        _eventLogger = EventLogger.GetLogger();
    }
    
    public static DatabaseAccessor GetDatabaseAccessor()
    {
        if (_databaseAccessor == null)
        {
            _databaseAccessor = new DatabaseAccessor();
        }
        return _databaseAccessor;
    }
    
    private Connection OpenDatabase(DatabaseName databaseName)
    {
        Connection c = null;
        try 
        {
          Class.forName("org.sqlite.JDBC");
          c = DriverManager.getConnection("jdbc:sqlite:" + databaseName + ".db");
        } catch ( Exception e ) 
        {
          ExitProgram.ExitProgramWith(EventLogger.class.getName(), "Could not create/open database: " + databaseName, e);
        }
        return c;
    }
    
    public Object[][] ExecuteQueryWithResult(DatabaseName databaseName, String query, ITableStrategy tableStrategy)
    {
        Connection connection = OpenDatabase(databaseName);
        Statement statement;
        Object[][] result = null;
        try
        {
            statement = connection.createStatement();
            if (tableStrategy != null)
            {
                ResultSet resultSet = statement.executeQuery(query);
                result = GetValuesFromResultSet(tableStrategy, resultSet);                
            }
            else
            {
                statement.executeUpdate(query);
            }
            statement.close();
            connection.close();
        } catch (Exception e)
        {
            _eventLogger.LogToFile(EventLoggerCodes.Error, "Could not complete: " + query);
            ExitProgram.ExitProgramWith(EventLogger.class.getName(), "Could not run query on database. \nCheck logs for details. ", e);
        }
        return result;
    }

    private Object[][] GetValuesFromResultSet(ITableStrategy tableStrategy, ResultSet resultSet)
    {
        Object[][] result = null;
        if (tableStrategy != null)
        {
            result = tableStrategy.GetValuesFromResultSet(resultSet);
        }
        return result;
    }
}
