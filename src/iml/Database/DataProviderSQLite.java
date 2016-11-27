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
    private final Parser _parser;

    public DataProviderSQLite()
    {
        _incomingTableStrategy = new IncomingTableStrategy();
        _outgoingTableStrategy = new OutgoingTableStrategy();
        _companyMasterTableStrategy = new CompanyMasterStrategy();
        _transporterTableStrategy = new TransporterStrategy();
        _mocQualityTableStrategy = new MOCQualityStrategy();
        _parser = new Parser();
        _tableManager = new TableManager();
        _tableManager.CreateTableIfNotExist(_incomingTableStrategy);
        _tableManager.CreateTableIfNotExist(_outgoingTableStrategy);
        _tableManager.CreateTableIfNotExist(_companyMasterTableStrategy);
        _tableManager.CreateTableIfNotExist(_transporterTableStrategy);
        _tableManager.CreateTableIfNotExist(_mocQualityTableStrategy);
    }

    public String GetIncomingData()
    {
        Object[][] result = _tableManager.ReadRecords(_incomingTableStrategy);
        return _parser.ConvertToString(result);
    }
    
    public String GetMOCAndQualityCode()
    {
        Object[][] result = _tableManager.ReadRecords(_mocQualityTableStrategy);
        return _parser.ConvertToString(result);
    }
    
    public String GetOutgoingData()
    {
        Object[][] result = _tableManager.ReadRecords(_outgoingTableStrategy);
        return _parser.ConvertToString(result);
    }
    
    public String GetCompanyMaster()
    {
        Object[][] result = _tableManager.ReadRecords(_companyMasterTableStrategy);
        return _parser.ConvertToString(result);
    }

    public String GetTransporterDetails()
    {
        Object[][] result = _tableManager.ReadRecords(_transporterTableStrategy);
        return _parser.ConvertToString(result);
    }

    public void SetIncomingData(String values)
    {
        Object[] valuesInJavaArray = _incomingTableStrategy.GetObjectArrayFromJSONArray(_parser.ConvertToArray(values));
        _tableManager.CreateRecord(_incomingTableStrategy, valuesInJavaArray);
    }
    
    public void SetOutgoingData(String values)
    {
        Object[] valuesInJavaArray = _outgoingTableStrategy.GetObjectArrayFromJSONArray(_parser.ConvertToArray(values));
        _tableManager.CreateRecord(_outgoingTableStrategy, valuesInJavaArray);
    }
    
    public void SetCompanyMasterData(String values)
    {
        Object[] valuesInJavaArray = _companyMasterTableStrategy.GetObjectArrayFromJSONArray(_parser.ConvertToArray(values));
        _tableManager.CreateRecord(_companyMasterTableStrategy, valuesInJavaArray);
    }
    
    public void SetMOCAndQualityCodeData(String values)
    {
        Object[] valuesInJavaArray = _mocQualityTableStrategy.GetObjectArrayFromJSONArray(_parser.ConvertToArray(values));
        _tableManager.CreateRecord(_mocQualityTableStrategy, valuesInJavaArray);
    }
    
    public void SetTransporterValuesInTable(String values)
    {
        Object[] valuesInJavaArray = _transporterTableStrategy.GetObjectArrayFromJSONArray(_parser.ConvertToArray(values));
        _tableManager.CreateRecord(_transporterTableStrategy, valuesInJavaArray);
    }
    
    public void UpdateIncomingData(int id, String values)
    {
        Object[] valuesInJavaArray = _incomingTableStrategy.GetObjectArrayFromJSONArray(_parser.ConvertToArray(values));
        _tableManager.UpdateRecord(_incomingTableStrategy, id, valuesInJavaArray);
    }
    
    public void UpdateOutgoingData(int id, String values)
    {
        Object[] valuesInJavaArray = _outgoingTableStrategy.GetObjectArrayFromJSONArray(_parser.ConvertToArray(values));
        _tableManager.UpdateRecord(_outgoingTableStrategy, id, valuesInJavaArray);
    }
    
    public void UpdateCompanyMasterData(int id, String values)
    {
        Object[] valuesInJavaArray = _companyMasterTableStrategy.GetObjectArrayFromJSONArray(_parser.ConvertToArray(values));
        _tableManager.UpdateRecord(_companyMasterTableStrategy, id, valuesInJavaArray);
    }
    
    public void UpdateMOCAndQualityCodeData(int id, String values)
    {
        Object[] valuesInJavaArray = _mocQualityTableStrategy.GetObjectArrayFromJSONArray(_parser.ConvertToArray(values));
        _tableManager.UpdateRecord(_mocQualityTableStrategy, id, valuesInJavaArray);
    }
    
    public void UpdateTransporterData(int id, String values)
    {
        Object[] valuesInJavaArray = _transporterTableStrategy.GetObjectArrayFromJSONArray(_parser.ConvertToArray(values));
        _tableManager.UpdateRecord(_transporterTableStrategy, id, valuesInJavaArray);
    }    
}
