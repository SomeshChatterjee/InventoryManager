/*
 *  Created by Somesh Chatterjee.
 */
package Logger;

import java.nio.file.Path;

/**
 *
 * @author somesh
 */
public class ViewLogger
{
    private static ViewLogger _viewLogger = null;
    
    private final FileLogger _fileLogger;
    private final Path _filename;        

    private ViewLogger()
    {
        _fileLogger = FileLogger.GetFileLoger();
        _filename = _fileLogger.CreateLogFile("ViewLogForIML");        
    }
    
    public static ViewLogger GetViewLogger()
    {
        if (_viewLogger == null)
        {
            _viewLogger = new ViewLogger();
        }
        return _viewLogger;
    }
    
    public void LogToFile(String message)
    {
        _fileLogger.WriteToFile(_filename, message);
    }        
}
