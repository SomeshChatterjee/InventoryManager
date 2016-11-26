/*
 *  Created by Somesh Chatterjee.
 */
package iml.Database.TableStrategies;

/**
 *
 * @author somesh
 */
public class Parser
{
    public static final String Seperator = "!~~~!";
    
    public String[] ConvertToArray(String input)
    {
        return input.split(Seperator);
    }
    
    public String ConvertToString(Object[] input)
    {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < input.length; ++i)
        {
            result.append(input[i]);
            if (i < input.length - 1)
            {
                result.append(Seperator);
            }
        }
        return result.toString();
    }
}
