/*
 *  Created by Somesh Chatterjee.
 */
package iml;

import Logger.EventLogger;
import Logger.EventLoggerCodes;
import Logger.ExitProgram;
import Logger.ViewLogger;
import com.sun.javafx.webkit.WebConsoleListener;
import iml.Database.DataProviderSQLite;
import javafx.concurrent.Worker;
import javafx.application.Application;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.scene.Scene;
import javafx.scene.layout.StackPane;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Stage;
import netscape.javascript.JSObject;

/**
 *
 * @author somesh
 */
public class Dashboard extends Application {
    
    private EventLogger _eventLogger;
    private static ViewLogger _viewLogger;
    
    @Override
    public void start(Stage primaryStage) 
    {
        _eventLogger = EventLogger.GetLogger();
        
        WebView webView = new WebView();
        WebEngine webEngine = webView.getEngine();
        JSObject jsobj = (JSObject) webEngine.executeScript("window");
        jsobj.setMember("DataProviderSQLite", new DataProviderSQLite());        
        
        webEngine.load(getClass().getResource("/HTML/Shell.html").toExternalForm());
        
        StackPane root = new StackPane();
        root.getChildren().add(webView);
        
        Scene scene = new Scene(root, 300, 200);
        
        primaryStage.setTitle("IML");
        primaryStage.setScene(scene);
        primaryStage.setMaximized(true);
        primaryStage.show();
        AddHandlerForApplicationClose();        
        
        webEngine.getLoadWorker().stateProperty().addListener((obs, oldValue, newValue) -> 
        {
            if (newValue == Worker.State.SUCCEEDED)
            {
                InitializeJavaBackend(webEngine);
                webEngine.setOnAlert(event -> DisplayMessages.DisplayAlert(event.getData()));
                webEngine.setConfirmHandler(message -> DisplayMessages.DisplayConfirmation(message));
            }
            else
            {
                _eventLogger.LogToFile(EventLoggerCodes.Error, "Webview failed to initialize.");
            }
        }
        );     
    }

    private void AddHandlerForApplicationClose()
    {
        Runtime.getRuntime().addShutdownHook(new Thread()
        {
            @Override
            public void run()
            {
                _eventLogger.LogToFile(EventLoggerCodes.Info, "Application closed.");
            }
        });
    }

    private void InitializeJavaBackend(WebEngine webEngine)
    {
        //webEngine.executeScript("if (!document.getElementById('FirebugLite')){E = document['createElement' + 'NS'] && document.documentElement.namespaceURI;E = E ? document['createElement' + 'NS'](E, 'script') : document['createElement']('script');E['setAttribute']('id', 'FirebugLite');E['setAttribute']('src', 'https://getfirebug.com/' + 'firebug-lite.js' + '#startOpened');E['setAttribute']('FirebugLite', '4');(document['getElementsByTagName']('head')[0] || document['getElementsByTagName']('body')[0]).appendChild(E);E = new Image;E['setAttribute']('src', 'https://getfirebug.com/' + '#startOpened');}"); 
        _eventLogger.LogToFile(EventLoggerCodes.Info, "Application launched.");
    }
    

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) 
    {
        try
        {
            SetupConsoleListener();
            launch(args);
        } catch (Exception e)
        {
            ExitProgram.ExitProgramWith("MainApplication", "Unhandled Exception", e);
        }
        
    }

    private static void SetupConsoleListener()
    {
        _viewLogger = ViewLogger.GetViewLogger();
        WebConsoleListener ourConsoleListener = new WebConsoleListener()
        {
            @Override
            public void messageAdded(WebView webView, String message, int lineNumber, String sourceId)
            {
                _viewLogger.LogToFile("Console: [" + sourceId + ":" + lineNumber + "] " + message);
            }
        };
        com.sun.javafx.webkit.WebConsoleListener.setDefaultListener(ourConsoleListener);
    }
    
}
