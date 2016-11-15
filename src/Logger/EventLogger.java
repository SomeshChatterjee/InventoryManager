/*
 *  Created by Somesh Chatterjee.
 */
package Logger;

import java.nio.file.Path;

/**
 *
 * @author somesh
 */
public class EventLogger
{
    private static EventLogger _logger = null;
    
    private final FileLogger _fileLogger;
    private final Path _filename;
    
    private EventLogger()
    {
        String filename = "EventLogForIML";
        _fileLogger = FileLogger.GetFileLoger();
        _filename = _fileLogger.CreateLogFile(filename);
    }
   
    
    public static EventLogger GetLogger()
    {
        if (_logger == null)
        {
            _logger = new EventLogger();
        }
        return _logger;
    }
    
    public void LogToFile(EventLoggerCodes loggerCode, String message)
    {
        _fileLogger.WriteToFile(_filename, loggerCode.toString() + ": " + message);
    }
}
