/*
 *  Created by Somesh Chatterjee.
 */
package Logger;

import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;

/**
 *
 * @author somesh
 */
public class FileLogger
{
    private static FileLogger _fileLogger;

    private FileLogger()
    {
    }
    
    public static FileLogger GetFileLoger()
    {
        if (_fileLogger == null)
        {
            _fileLogger = new FileLogger();
        }
        return _fileLogger;
    }
    
    public Path CreateLogFile(String filename)
    {
        Path path = null;
        try
        {
            String logFolderName = "Logs/" + filename;
            Files.createDirectories(Paths.get(logFolderName));
            DateFormat dateFormat = new SimpleDateFormat("d,MMM,yyyy");
            Date date = new Date();      
            filename = logFolderName + "/" + filename + dateFormat.format(date) + ".txt";
            path = Paths.get(filename);
            Files.createFile(path);
        } 
        catch (FileAlreadyExistsException fileEx)
        {
            // Do nothing.
        }
        catch (IOException ex)
        {
            ExitProgram.ExitProgramWith(EventLogger.class.getName(), "Could not open/create " + filename + " file", ex);
        }        
        return path;
    }
    
    public void WriteToFile(Path fileName, String message)
    {
        DateFormat dateFormat = new SimpleDateFormat("EEE, d MMM yyyy HH:mm:ss Z");
        Date date = new Date();
        message = dateFormat.format(date) + "-> " + message;
        
        List<String> messageAsArray = Arrays.asList(message);
        try
        {
            Files.write(fileName, messageAsArray, StandardOpenOption.APPEND);
        } catch (IOException ex)
        {
            java.util.logging.Logger.getLogger(EventLogger.class.getName()).log(Level.SEVERE, null, ex);
        }        
    }    
}
