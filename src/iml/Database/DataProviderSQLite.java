/*
 *  Created by Somesh Chatterjee.
 */
package iml.Database;

import iml.Database.TableStrategies.CompanyMasterStrategy;
import iml.Database.TableStrategies.ITableStrategy;
import iml.Database.TableStrategies.IncomingTableStrategy;
import iml.Database.TableStrategies.MOCQualityStrategy;
import iml.Database.TableStrategies.OutgoingTableStrategy;
import iml.Database.TableStrategies.Parser;
import iml.Database.TableStrategies.TransporterStrategy;
import iml.DisplayMessages;

/**
 *
 * @author somesh
 */
public class DataProviderSQLite
{
    private final TableManager _tableManager;
    private final ITableStrategy _incomingTableStrategy;
    private final ITableStrategy _outgoingTableStrategy;
    private final ITableStrategy _companyMasterTableStrategy;
    private final ITableStrategy _transporterTableStrategy;
    private final ITableStrategy _mocQualityTableStrategy;

    public DataProviderSQLite()
    {
        _incomingTableStrategy = new IncomingTableStrategy();
        _outgoingTableStrategy = new OutgoingTableStrategy();
        _companyMasterTableStrategy = new CompanyMasterStrategy();
        _transporterTableStrategy = new TransporterStrategy();
        _mocQualityTableStrategy = new MOCQualityStrategy();
        _tableManager = new TableManager();
        _tableManager.CreateTableIfNotExist(_incomingTableStrategy);
        _tableManager.CreateTableIfNotExist(_outgoingTableStrategy);
        _tableManager.CreateTableIfNotExist(_companyMasterTableStrategy);
        _tableManager.CreateTableIfNotExist(_transporterTableStrategy);
        _tableManager.CreateTableIfNotExist(_mocQualityTableStrategy);
    }

    public Object[][] GetIncomingData()
    {
        return _tableManager.ReadRecords(_incomingTableStrategy);
    }
    
    public Object[][] GetMOCAndQualityCode()
    {
        return _tableManager.ReadRecords(_mocQualityTableStrategy);
    }
    
    public Object[][] GetOutgoingData()
    {
        return _tableManager.ReadRecords(_outgoingTableStrategy);
    }
    
    public Object[][] GetCompanyMaster()
    {
        return _tableManager.ReadRecords(_companyMasterTableStrategy);
    }

    public Object[][] GetTransporterDetails()
    {
        return _tableManager.ReadRecords(_transporterTableStrategy);
    }

    public void SetIncomingData(Object[] values)
    {
        _tableManager.CreateRecord(_incomingTableStrategy, values);
    }
    
    public void SetOutgoingData(Object[] values)
    {
        _tableManager.CreateRecord(_outgoingTableStrategy, values);
    }
    
    public void SetCompanyMasterData(Object[] values)
    {
        _tableManager.CreateRecord(_companyMasterTableStrategy, values);
    }
    
    public void SetMOCAndQualityCodeData(Object[] values)
    {
        _tableManager.CreateRecord(_mocQualityTableStrategy, values);
    }
    
    public void SetTransporterValuesInTable(Object[] values)
    {
        _tableManager.CreateRecord(_transporterTableStrategy, values);
    }
    
    public void UpdateIncomingData(int id, String values)
    {
        //_tableManager.UpdateRecord(_incomingTableStrategy, id, values);
    }
    
    public void UpdateOutgoingData(int id, String values)
    {
        //_tableManager.UpdateRecord(_outgoingTableStrategy, id, values);
    }
    
    public void UpdateCompanyMasterData(int id, String values)
    {
        //_tableManager.UpdateRecord(_companyMasterTableStrategy, id, values);
    }
    
    public void UpdateMOCAndQualityCodeData(int id, String values)
    {
        DisplayMessages.DisplayAlert("Finlly here!");
        //_tableManager.UpdateRecord(_mocQualityTableStrategy, id, values);
    }
    
    public void UpdateTransporterData(int id, String values)
    {
        //_tableManager.UpdateRecord(_transporterTableStrategy, id, values);
    }    
    
    public String GetSeperator()
    {
        return Parser.Seperator;
    }
}
