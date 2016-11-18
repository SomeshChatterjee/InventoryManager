/*
 *  Created by Somesh Chatterjee.
 */
package iml;

import javax.swing.JOptionPane;

/**
 *
 * @author somesh
 */
public class DisplayMessages
{    
    public static void DisplayAlert(String message)
    {
        JOptionPane.showMessageDialog(null, message);        
    }    
    
    public static boolean DisplayConfirmation(String message)
    {
        int result = JOptionPane.showConfirmDialog(null, message);
        return result == 0;
    }
}
