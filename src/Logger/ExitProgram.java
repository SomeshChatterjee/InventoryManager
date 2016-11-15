/*
 *  Created by Somesh Chatterjee.
 */
package Logger;

import java.util.logging.Level;
import javax.swing.JOptionPane;

/**
 *
 * @author somesh
 */
public class ExitProgram
{
    private static EventLogger _eventLogger = EventLogger.GetLogger();
    public static void ExitProgramWith(String className, String exceptionMessage, Exception ex)
    {
        java.util.logging.Logger.getLogger(className).log(Level.SEVERE, exceptionMessage, ex);
        _eventLogger.LogToFile(EventLoggerCodes.Error, exceptionMessage + "\n" + ex);
        JOptionPane.showMessageDialog(null, exceptionMessage + "\n" + ex);
        System.exit(0);
    }
}
