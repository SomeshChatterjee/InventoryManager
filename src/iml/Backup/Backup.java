/*
 *  Created by Somesh Chatterjee.
 */
package iml.Backup;

import Logger.EventLogger;
import Logger.EventLoggerCodes;
import java.io.File;
import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author somesh
 */
public class Backup
{
    String _directoryName = "Backup/";
    String _dateFormat = "d,MMM,yyyy";
    private static final EventLogger _eventLogger = EventLogger.GetLogger();
    
    public void InitiateBackup()
    {
        try
        {
            Files.createDirectories(Paths.get(_directoryName));
            String backupFileName = GetBackupFileName();
            DeleteOldBackups();
            CreateBackup(backupFileName);
        }
        catch (FileAlreadyExistsException fileEx)
        {
            // Do nothing.
        }        
        catch (IOException ex)
        {
            Logger.getLogger(Backup.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    private String GetBackupFileName()
    {
        DateFormat dateFormat = new SimpleDateFormat(_dateFormat);
        Date date = new Date();        
        return dateFormat.format(date) + ".db";
    }
    
    private void CreateBackup(String backupFileName)
    {
        String backupFileNameWithFolder = _directoryName + backupFileName;
        String databasePath = "IML.db";
        File sourceFile = new File(databasePath);
        File destFile = new File(backupFileNameWithFolder);
        try
        {
            Files.copy(sourceFile.toPath(), destFile.toPath());
        }
        catch (FileAlreadyExistsException fileEx)
        {
            // Do nothing.
        }        
        catch (IOException ex)
        {
            _eventLogger.LogToFile(EventLoggerCodes.Error, "Failed to create backup of existing db.");
        }
    }
    
    private void DeleteOldBackups()
    {
        try
        {
            Object[] filesInDirectory = Files.list(Paths.get(_directoryName)).toArray();
            int maxNumberOfFiles = 0;
            
            if (filesInDirectory.length > maxNumberOfFiles)
            {
                long currentTime = new Date().getTime();
                for (int i = 0; i < filesInDirectory.length; ++i)
                {
                    File file = Paths.get(filesInDirectory[i].toString()).toFile();
                    long diff = currentTime - file.lastModified();
                    final int milisecondsInTenDays = 1000*60*60*24*10;
                    if (diff > milisecondsInTenDays)
                    {
                        file.delete();
                    }
                }                
            }
        }
        catch (FileAlreadyExistsException fileEx)
        {
            // Do nothing.
        }        
        catch (IOException ex)
        {
            _eventLogger.LogToFile(EventLoggerCodes.Error, "Could not delete old backups.");
        }
        catch(Exception ex)
        {
            _eventLogger.LogToFile(EventLoggerCodes.Error, "Could not delete old backups.");
        }
    }
}
