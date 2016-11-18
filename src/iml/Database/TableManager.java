/*
 *  Created by Somesh Chatterjee.
 */
package iml.Database;

import Logger.EventLogger;
import Logger.EventLoggerCodes;
import iml.Database.Codes.DatabaseName;
import iml.Database.TableStrategies.ITableStrategy;

/**
 *
 * @author somesh
 */
public class TableManager
{
    private final DatabaseAccessor _databaseAccessor;
    private final EventLogger _eventLogger;
    private final ITableStrategy _tableStrategy;

    public TableManager(ITableStrategy tableStrategy)
    {
        _databaseAccessor = DatabaseAccessor.GetDatabaseAccessor();
        _eventLogger = EventLogger.GetLogger();
        _tableStrategy = tableStrategy;
        CreateTableIfNotExist();
    }
    
    private void CreateTableIfNotExist()
    {
        _databaseAccessor.ExecuteQueryWithResult(DatabaseName.IML, _tableStrategy.CreateTableQuery(), null);
    }
    
    public void CreateRecord(Object[] values)
    {
        String query = _tableStrategy.CreateRecordQuery(values);
        if (query.equals("") == false)
        {
            _eventLogger.LogToFile(EventLoggerCodes.Info, "Creating a new record in" + _tableStrategy.GetTableName());
            _databaseAccessor.ExecuteQueryWithResult(DatabaseName.IML, query, null);
        }
    }
    
    public Object[][] ReadRecords()
    {
        _eventLogger.LogToFile(EventLoggerCodes.Info, "Reading values from table: " + _tableStrategy.GetTableName());
        return _databaseAccessor.ExecuteQueryWithResult(DatabaseName.IML, _tableStrategy.ReadQuery(), _tableStrategy);
    }
    
    public void UpdateRecord(Object[] values)
    {
        String query = _tableStrategy.UpdateQuery(values);
        if (query.equals("") == false)
        {
            _eventLogger.LogToFile(EventLoggerCodes.Info, "Updating record in table: "+ _tableStrategy.GetTableName());
            _databaseAccessor.ExecuteQueryWithResult(DatabaseName.IML, query, null);
        }
    }
}
