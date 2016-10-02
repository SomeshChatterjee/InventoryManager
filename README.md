# InventoryManager
Uses view created in HTML, JavaScript and integrates it to a JavaFX backend
View tables are created using - [DataTables](https://datatables.net)

The purpose of the code base is to try create an app which can be reused across platforms.
To achieve this the following has been done:
* View - in HTML, CSS, JavaScript and jQuery
* Business Logic - JavaScript
* Backend:
* 1. Windows/Linux - JavaFX Webview
* 2. Android - Android Webview

You will see that the DataTable and JQuery is directly added as code files in the repository instead of using it from a CDN. That's because I want to load the files from within JavaFX and the computer running the application need not need to have a working internet connection.

The application is also hosted on one of my [sites](http://someshchatterjee.co.nf/IML/Shell.html) in case you wish to check it out.
