/*
 *  Created by Somesh Chatterjee.
 */
package iml.Database;
import Logger.DatabaseLogger;
import Logger.DatabaseLoggerCodes;
import Logger.ExitProgram;
import Logger.EventLogger;
import Logger.EventLoggerCodes;
import iml.Database.Codes.DatabaseName;
import iml.Database.TableStrategies.ITableStrategy;
import java.sql.*;
import java.util.List;
/**
 *
 * @author somesh
 */
public class DatabaseAccessor
{
    private final EventLogger _eventLogger;
    private final DatabaseLogger _databaseLogger;
    private static DatabaseAccessor _databaseAccessor;

    private DatabaseAccessor()
    {
        _eventLogger = EventLogger.GetLogger();
        _databaseLogger = DatabaseLogger.GetDatabaseLogger();
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
    
    public List<List<Object>> ExecuteQueryWithResult(DatabaseName databaseName, String query, ITableStrategy tableStrategy)
    {
        Connection connection = OpenDatabase(databaseName);
        Statement statement;
        List<List<Object>> result = null;
        try
        {
            statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(query);
            result = GetValuesFromResultSet(tableStrategy, resultSet);
            statement.close();
            connection.close();
            _eventLogger.LogToFile(EventLoggerCodes.Info, "Database query ran successfully.");
            _databaseLogger.LogToFile(DatabaseLoggerCodes.Success, query);
        } catch (Exception e)
        {
            _databaseLogger.LogToFile(DatabaseLoggerCodes.Failure, query);
            ExitProgram.ExitProgramWith(EventLogger.class.getName(), "Could not run query on database. \nCheck Database logs for details. ", e);
        }
        return result;
    }

    private List<List<Object>> GetValuesFromResultSet(ITableStrategy tableStrategy, ResultSet resultSet)
    {
        List<List<Object>> result = null;
        if (tableStrategy != null)
        {
            result = tableStrategy.GetValuesFromResultSet(resultSet);
        }
        return result;
    }
}
