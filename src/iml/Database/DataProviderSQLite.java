/*
 *  Created by Somesh Chatterjee.
 */
package iml.Database;

import iml.Database.TableStrategies.IncomingTableStrategy;

/**
 *
 * @author somesh
 */
public class DataProviderSQLite
{
    private final TableManager _incomingTableManager;

    public DataProviderSQLite()
    {
        _incomingTableManager = new TableManager(new IncomingTableStrategy());
    }

    public Object[][] GetIncomingData()
    {
        return _incomingTableManager.ReadRecords();
    }
}
