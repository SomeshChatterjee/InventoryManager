/*
 *  Created by Somesh Chatterjee.
 */
package Logger;

import iml.DisplayMessages;
import java.util.logging.Level;

/**
 *
 * @author somesh
 */
public class ExitProgram
{
    private static final EventLogger _eventLogger = EventLogger.GetLogger();
    public static void ExitProgramWith(String className, String exceptionMessage, Exception ex)
    {
        java.util.logging.Logger.getLogger(className).log(Level.SEVERE, exceptionMessage, ex);
        _eventLogger.LogToFile(EventLoggerCodes.Error, "ClassName: " + className + "Exception: " + exceptionMessage + "\n" + ex);
        DisplayMessages.DisplayAlert(exceptionMessage + "\n" + ex);
        System.exit(0);
    }
}
