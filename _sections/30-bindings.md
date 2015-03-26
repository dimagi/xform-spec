---
title: Bindings
---

A `<bind>` element wires together a primary instance node and the presentation of the corresponding question to the user. It is used to describe the datatype and various kinds of logic related to the data. A bind can refer to any node in the primary instance including repeated nodes_. It may or may not have a corresponding presentation node in the [body](#body). 

An instance node does not require a corresponding `<bind>` node, regardless of whether it has a presentation node.

{% highlight xml %}
<bind nodeset="/d/my_intro" type="string" readonly="true()"/>
<bind nodeset="/d/text_widgets/my_string" type="string"/>
<bind nodeset="/d/text_widgets/my_long_text" type="string"/>
<bind nodeset="/d/number_widgets/my_int" type="int" constraint=". &lt; 10" jr:constraintMsg="number must be less than 10"  />
<bind nodeset="/d/number_widgets/my_decimal" type="decimal" constraint=". &gt; 10.51 and . &lt; 18.39" jr:constraintMsg="number must be between 10.51 and 18.39" />
<bind nodeset="/d/dt/my_date" type="date" constraint=". &gt;= today()" jr:constraintMsg="only future dates allowed" />
<bind nodeset="/d/dt/my_time" type="time"/>
<bind nodeset="/d/dt/dateTime" type="dateTime"/>
<bind nodeset="/d/s/my_select" type="select" constraint="selected(., 'c') and selected(., 'd'))" jr:constraintMsg="option c and d cannot be selected together" />
<bind nodeset="/d/s/my_select1" type="select1"/>
<bind nodeset="/d/geo/my_geopoint" type="geopoint"/>
<bind nodeset="/d/media/my_image" type="binary"/>
<bind nodeset="/d/media/my_audio" type="binary"/>
<bind nodeset="/d/media/my_video" type="binary"/>
<bind nodeset="/d/media/my_barcode" type="barcode"/>
<bind nodeset="/d/display/my_trigger" required="true()"/>
{% endhighlight %}

### Bind Attributes

The following attributes are supported on `<bind>` nodes. Only the nodeset attribute is required.

| attribute | description |
| --------- | --------- |
| `nodeset`   | Specifies the [path](#xpath-paths) to the instance node or attribute \[required\].
| `type`      | Specifies the data type. These are discussed below. Considered string if omitted.
| `readonly`  | Specifies whether the user is allowed to enter data, options: `true()`, and `false()`. Considered `false()` if omitted. [review](# "not sure if readonly is supported")
| `required`  | Specifies whether the question requires a non-empty value, options: `true()`, and `false()`. Considered `false()` if omitted.
| `relevant`  | Specifies whether the question or group is relevant. The question or group will only be presented to the user when the XPath expression evaluates to `true()`. When `false()` the data node (and its descendants) are removed from the primary instance on submission.
| `constraint`| Specifies acceptable answers for the specified prompt with an XPath expression. Will only be evaluated when the node is non-empty.
| `calculate` | Calculates a node value with an XPath expression.
| `jr:constraintMsg` | The message that will be displayed if the specified constraint is violated.

[enketo](# "In Enketo nodesets cannot refer to attributes.")

### Data Types

| type 	     | description
|------------|------------
| `string`   | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#string)
| `int`      | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#int)
| `boolean`  | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#boolean)
| `decimal`  | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#decimal)
| `date`     | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#date)
| `time` 	 | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#time)
| `dateTime` | As in [XML 1.0](http://www.w3.org/TR/xmlschema-2/#dateTime)
| `select`   | space-separated list of strings [review]()
| `select1`  | as string (spaces strongly discouraged) [review]()
| `geopoint` | space-separated list of valid latitude (decimal degrees), longitude (decimal degrees), altitude (decimal meters) and accuracy (decimal meters)
| `binary`   | [review]()
| `barcode`  | as string [review]()
| `intent`   | used for [external applications](#declaring-external-application)

### XPath Paths

XPath paths are used in XForms to reference instance nodes to store or retrieve data. Both absolute and relative paths are supported, along with using the proper relative path context node, depending on the situation. Paths can currently only reference XML elements (not attributes, comments, or raw text). The references `.` and `..` are also supported at any point in the path. 

The following are examples of valid paths:

* `.`
* `..`
* `/`
* `node`
* `/absolute/path/to/node`
* `../relative/path/to/node`
* `./relative/path/to/node`
* `another/relative/path`
* `//node`


### XPath Expressions

All [XPath 1.0 expressions](http://www.w3.org/TR/xpath/#section-Expressions) are supported, i.e. `|`, `or`, `and`, `=`, `!=`, `<=`, `<`, `>=`, `>`.

### XPath Predicates

Predicates are fully supported but with the limitations described in [XPath Axes](#xpath-axes) and [XPath Functions](#xpath-functions)

### XPath Axes

Only the _parent_ and _child_ axes are supported of the [XPath 1.0 axes](https://developer.mozilla.org/en-US/docs/Web/XPath/Axes). [review]()

### XPath Functions

A subset of [XPath 1.0 functions](http://www.w3.org/TR/xpath/#corelib), some functions of later versions of XPath, and a number of additional custom functions are supported. Some of the XPath 1.0 functions have been extended with additional functionality. 

| function                                  | description |
|-------------------------------------------|------|
| `concat(* arg*)` 							| Deviates from [XPath 1.0](http://www.w3.org/TR/xpath/#function-concat) in that it may contain _1 argument_ and that all arguments can be _nodesets_ or strings. It concatenates all string values and _all node values_ inside the provided nodesets.
| `selected(string list, string value)` 	| Checks if value is equal to an item in a space-separated list (e.g. `select` data type values).
| `selected-at(string list, int index)` 	| Returns the value of the item at the 1-based index of a space-separated list or empty string if the item does not exist (including for negative index and index 0).
| `count-selected(string list)` 			| Returns the number of items in a space-separated list (e.g. `select` data type values).
| `jr:choice-name(string value, node node)` | Returns the label value in the active language corresponding to the choice option with the given value of a select or select1 question question for the given data node. (sorry) [review](# "supported in CommCare?")
| `jr:itext(string arg)`                    | Obtains an itext value for the provided reference in the active language.
| `true()` 									| As in [XPath 1.0](http://www.w3.org/TR/xpath/#section-Boolean-Functions).
| `false()` 								| As in [XPath 1.0](http://www.w3.org/TR/xpath/#section-Boolean-Functions).
| `boolean(* arg)` 							| As in [XPath 1.0](http://www.w3.org/TR/xpath/#section-Boolean-Functions).
| `boolean-from-string(string arg)` 		| Returns true if arg is "true" or "1", otherwise returns false.
| `not(boolean arg)`						| As in [XPath 1.0](http://www.w3.org/TR/xpath/#function-not).
| `number(* arg)` 							| As in [XPath 1.0](http://www.w3.org/TR/xpath/#function-number).
| `int(* arg)` 								| Converts to an integer.
| `double(* arg)` 							| Converts to a floating-point number. [review](# "Should this function be in this spec?")
| `string(* arg)` 							| As in [XPath 1.0](http://www.w3.org/TR/xpath/#function-string).
| `format-date(date value, string format)` 	| Returns the date value formatted as defined by the format argument using the following identifiers:<br/>`%Y`: 4-digit year<br/>`%y`: 2-digit year<br/>`%m` 0-padded month<br/>`%n` numeric month<br/>`%b` short text month (Jan, Feb, etc)<br/>`%d` 0-padded day of month<br/>`%e` day of month<br/>`%H` 0-padded hour (24-hr time)<br/>`%h` hour (24-hr time)<br/>`%M` 0-padded minute<br/>`%S` 0-padded second<br/>`%3` 0-padded millisecond ticks<br/>`%a` short text day (Sun, Mon, etc)
| `date (* value)` 							| Converts to date.
| `regex(string value, string expression)` 	| Returns result of regex test on provided value. The regular expression is created from the provided expression string (`'[0-9]+'` becomes `/[0-9]+/`).
| `coalesce(string arg1, string arg2)` 		| Returns first non-empty value of arg1 and arg2 or empty if both are empty and/or non-existent.
| `join(string separator, nodeset nodes*)` 	| Joins the provided arguments using the provide separator between values.
| `substr(string value, number start, number end?)` | Returns the substring beginning at the specified _0-based_ start index and extends to the character at end index - 1.
| `string-length(string arg)`				| Deviates from [XPath 1.0](http://www.w3.org/TR/xpath/#function-string-length) in that the argument is _required_.
| `count(nodeset arg)`						| As in [XPath 1.0](http://www.w3.org/TR/xpath/#function-count).
| `sum(nodeset arg)`						| As in [XPath 1.0](http://www.w3.org/TR/xpath/#function-sum).
| `max(nodeset arg*)`						| As in [XPath 2.0](http://www.w3.org/TR/xpath-functions/#func-max). [pending](https://code.google.com/p/opendatakit/issues/detail?id=1044)
| `min(nodeset arg*)`						| As in [XPath 2.0](http://www.w3.org/TR/xpath-functions/#func-min). [pending](https://code.google.com/p/opendatakit/issues/detail?id=1044)
| `round(number arg, number decimals?)`		| Deviates from [XPath 1.0](http://www.w3.org/TR/xpath/#function-round) in that a second argument may be provided to specify the number of decimals. [pending](https://code.google.com/p/opendatakit/issues/detail?id=1045)
| `pow(number value, number power)`			| As in [XPath 3.0](http://www.w3.org/TR/xpath-functions-30/#func-math-pow).
| `abs(number arg)`                         | As in [XPath 3.0]() [enketo](# "not supported in Enketo") 
| `ceiling(number arg)`                     | As in [XPath 1.0](http://www.w3.org/TR/xpath/#function-ceiling) 
| `floor(number arg)`                       | As in [XPath 1.0](http://www.w3.org/TR/xpath/#function-floor)
| `log(number arg)`                         | As in [XPath 3.0](http://www.w3.org/TR/xpath-functions-30/#func-math-log) [enketo](# "not supported in Enketo")
| `log10(number arg)`                       | As in [XPath 3.0](http://www.w3.org/TR/xpath-functions-30/#func-math-log10) [enketo](# "not supported in Enketo")
| `upper-case(string arg)`                  | As in [XPath 3.0](http://www.w3.org/TR/xpath-functions-30/#func-upper-case) [enketo](# "not supported in Enketo")
| `contains(string arg)`                    | As in [XPath 1.0](http://www.w3.org/TR/xpath/#function-contains)
| `starts-with(string subj, string search)` | As in [Xpath 1.0](http://www.w3.org/TR/xpath/#function-starts-with)
| `ends-width(string subj, string search)`  | As in [XPath 3.0](http://www.w3.org/TR/xpath-functions-30/#func-ends-with) [enketo](# "not supported in Enketo") 
| `translate(string a, string b, string c)` | As in [Xpath 1.0](http://www.w3.org/TR/xpath/#function-translate)
| `replace(string input, string pattern, string replacement)`| As in [XPath 3.0](http://www.w3.org/TR/xpath-functions-30/#func-replace) [enketo](# "not supported in Enketo")
| `today()`									| Returns today's datetime as a string [review]()
| `now()`									| same as today() [review]()
| `random()`								| Returns a random number between 0.0 (inclusive) and 1.0 (exclusive)
| `depend(* arg*)`							| Returns first argument [review](# "Should this function be in this spec?")
| `uuid()`									| Return a random [RFC 4122 version 4](http://tools.ietf.org/html/rfc4122) compliant UUID string [review]()
| `checklist(number min, number max, string v*)`				    | Check wether the count of answers that evaluate to true (when it converts to a number > 0) is between the minimum and maximum inclusive. Min and max can be -1 to indicate _not applicable_.
| `weighted-checklist(number min, number max, [string v, string w]*)`	| Like checklist(), but the number of arguments has to be even. Each v argument is paired with a w argument that _weights_ each v (true) count. The min and max refer to the weighted totals.
| `position(node arg?)`						| Deviates from [XPath 1.0](http://www.w3.org/TR/xpath/#function-position) in that it accepts an argument. This argument has to be a single node. If an argument is provided the function returns the position of that node amongst its siblings (with the same node name). [review](# "Unclear to me if CommCare implementation is like this - ODK code difference")
| `instance(string id)`                     | Returns a [secondary instance](#secondary-instances) node with the provided id, e.g. `instance('cities')/item/[country=/data/country]`. It is the only way to refer to a node outside of the primary instance. Note that it doesn't switch the XML Document (the primary instance) or document root for other expressions. E.g. `/data/country` still refers to the primary instance.
| `current()`                               | In the same league as `instance(ID)` but always referring to the primary instance (and accepting no arguments). Unlike instance(ID), which always requires an absolute path, current() can be used with relative references (e.g. `current()/.` and `current()/..`).  


### Metadata

[review]()

This section describes metadata about _the record_ that is created with the form. Metadata about _the form itself_ (id, version, etc) is covered in the [Primary Instance section](#primary-instance).

The namespace of the meta block is either the default XForms namespace or `"https://openrosa.org/jr/xforms"`.

{% highlight xml %}
<instance>
    <data xmlns:jrm="http://dev.commcarehq.org/jr/xforms" xmlns="http://openrosa.org/formdesigner/C59FC6EE-2AD7-4DD5-892A-72DED4338CDE" uiVersion="1" version="637" name="Case Create">
        <question2/>
        <casename/>
        <confirm/>
        <orx:meta xmlns:cc="http://commcarehq.org/xforms">
            <orx:deviceID/>
            <orx:timeStart/>
            <orx:timeEnd/>
            <orx:username/>
            <orx:userID/>
            <orx:instanceID/>
        </orx:meta>
    </data>
</instance>
{% endhighlight %}

Note that if these meta elements have a `<bind>` with a `calculate` property, the value may change at any time, e.g. when loading a draft record for further data entry. Therefore, it is usually better to **not include a `calculate`** and let the client populate metadata automatically with the defaults mentioned in the table below. 

[enketo](# "Enketo will vigorously ignore any calculate attribute on meta/instanceID to keep the value stable.")

As with other nodes, `<bind>`s are not required. They are not particularly useful for metadata either.

| element      | description                                       | default datatype | default value             | namespace
|--------------|---------------------------------------------------|----------------------------------------------------------------------------
| `instanceID`   | The unique ID of the record [required]          | string           | concatenation of 'uuid:' and uuid() | same as meta block
| `timeStart`    | A timestamp of when the form entry was started    | datetime         | now()                     | same as meta block
| `timeEnd`      | A timestamp of when the form entry ended          | datetime         | now()                     | same as meta block
| `userID`       | The username stored in the client, when available | string           |                             | same as meta block
| `deviceID`     | Unique identifier of device. Guaranteed not to be blank but could be 'not supported'. Either the cellular IMEI (with imei: prefix, e.g. imei:A0006F5E212), WiFi mac address (with mac: prefix, e.g mac:01:23:45:67:89:ab), Android ID (e.g. android_id:12011110), or another unique device ID for a webbased client (with domain prefix,e .g. enketo.org:SOMEID) | string | depends on client, prefixed | same as meta block
| `deprecatedID` | The `<instanceID/>` of the submission for which this is a revision. This revision will have been given a newly generated `<instanceID/>` and this field is populated by the prior value. Server software can use this field to unify multiple revisions to a submission into a consolidated submission record. | string | concatenation of 'uuid:' and uuid() | same as meta block

Another approach for adding meta data to a record is to use [actions](#actions) and [external instances](#external-instances) (e.g. a session instance)




