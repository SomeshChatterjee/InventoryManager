/*
 *  Created by Somesh Chatterjee.
 */
package iml.Database.TableStrategies;

import Logger.EventLogger;
import Logger.EventLoggerCodes;
import iml.DisplayMessages;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;



/**
 *
 * @author somesh
 */
public class Parser
{
    EventLogger _eventLogger;

    public Parser()
    {
        _eventLogger = EventLogger.GetLogger();
    }
    
    public JSONArray ConvertToArray(String input)
    {
        Object result = null;
        JSONParser parser = new JSONParser();
       try
       {
           result = parser.parse(input);
       } catch (ParseException ex)
       {
           DisplayMessages.DisplayAlert("Could not process the request. Check log files for details.");
           _eventLogger.LogToFile(EventLoggerCodes.Error, "Could parse JSON: " + input);
       }
       return (JSONArray) result;
    }
    
    public String ConvertToString(Object[][] input)
    {
        JSONArray result = new JSONArray();
        for (int i = 0; i < input.length; ++i)
        {
            Object[] row = input[i];
            JSONArray newRow = new JSONArray();
            for (int j = 0; j < row.length; ++j)
            {
                newRow.add(row[j]);
            }
            result.add(newRow);
        }
        return result.toJSONString();
    }
}
