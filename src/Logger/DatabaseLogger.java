/*
 *  Created by Somesh Chatterjee.
 */
package Logger;
import java.nio.file.Path;

/**
 *
 * @author somesh
 */
public class DatabaseLogger
{
    private static DatabaseLogger _databaseLogger = null;
        
    private final FileLogger _fileLogger;
    private final Path _filename;    

    private DatabaseLogger()
    {
        _fileLogger = FileLogger.GetFileLoger();
        _filename = _fileLogger.CreateLogFile("DatabaseLogForIML");
    }
    
    public static DatabaseLogger GetDatabaseLogger()
    {
        if (_databaseLogger == null)
        {
            _databaseLogger = new DatabaseLogger();
        }
        return _databaseLogger;
    }
    
    public void LogToFile(DatabaseLoggerCodes code, String message)
    {
        _fileLogger.WriteToFile(_filename, code + ": " + message);
    }    
}
