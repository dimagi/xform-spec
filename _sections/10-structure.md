---
title: Structure
---

The high-level form definition is structured as follows:

* model 
    * instance
    * bindings
* body

The model contains the **[instance](#instance)**(s), the **[bindings](#bindings)** and the [actions](#actions). The first instance is the XML data structure of the _record_ that is captured with the form. A binding describes an individual instance node and includes information such as _datatype, skip logic, calculations,_ and more.

The **[body](#body)** contains the information required to _display_ a form. 

Below is an example of a complete and valid XForm:

{% highlight xml %}
<?xml version="1.0"?>
<h:html xmlns="http://www.w3.org/2002/xforms" 
        xmlns:h="http://www.w3.org/1999/xhtml" 
        xmlns:jr="http://openrosa.org/javarosa" 
        xmlns:orx="http://openrosa.org/xforms/" 
        xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <h:head>
        <h:title>My Survey</h:title>
        <model>
            <instance>
                <data orx:version="2014083101" xmlns="http://openrosa.org/formdesigner/39A2CA97-2EB8-4A9C-A0D1-6AA666666A66">
                    <firstname></firstname>
                    <lastname></lastname>
                    <age></age>
                    <orx:meta>
                        <orx:instanceID/>
                    </orx:meta>
                </data>
            </instance>
            <bind nodeset="/data/firstname" type="xsd:string" required="true()" />
            <bind nodeset="/data/lastname"  type="xsd:string" />
            <bind nodeset="/data/age" type="xsd:int" />
        </model>
    </h:head>
    <h:body>
        <input ref="/data/firstname">
          <label>What is your first name?</label>
        </input>
        <input ref="/data/lastname">
          <label>What is your last name?</label>
        </input>
        <input ref="/data/age">
          <label>What is your age?</label>
        </input>
    </h:body>
</h:html>
{% endhighlight %}

Outside of this simplified structure there are ways to define: 

* form title as the `<title>` element, a child of the `<head>` element,
* [linkages with external (mobile) applications](#external-applications), 
* [language dictionaries](#languages). 
