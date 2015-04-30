---
title: Actions
---

The XForm can specify an action that should be taken in response to a particular event, as described in the [XForms specification](http://www.w3.org/TR/xforms/#action). The only actions supported are *setvalue* (XForms) and *pollsensor* (custom) which sets an instance value. They can be included by using `<setvalue>` or `<orx:pollsensor>` childnodes in the model (i.e. as siblings of `<bind>` nodes).

The `<setvalue>` action sets a value according to the expression or value provided. The `<pollsensor` action has the "https://openrosa.org/xforms/" namespace, and is used to set geopoint value of the current location.

[enketo](# "Actions not supported in Enketo.")

{% highlight xml %}
<!-- setvalue examples -->
<bind nodeset="/data/orx:meta/orx:timeStart" type="xsd:dateTime"/>
<bind nodeset="/data/orx:meta/orx:timeEnd" type="xsd:dateTime"/>
<setvalue event="xforms-ready" ref="/data/meta/timeStart" value="now()"/>
<setvalue event="xforms-revalidate" ref="/data/meta/timeEnd" value="now()"/>
<setvalue event="xforms-ready" ref="/data/meta/deviceID" value="instance('commcaresession')/session/context/deviceid"/>
<setvalue event="xforms-ready" ref="/data/meta/username" value="instance('commcaresession')/session/context/username"/>
<setvalue event="xforms-ready" ref="/data/meta/userID" value="instance('commcaresession')/session/context/userid"/>
<setvalue event="xforms-ready" ref="/data/meta/instanceID" value="uuid()"/>
<setvalue event="xforms-ready" ref="/data/meta/appVersion" value="instance('commcaresession')/session/context/appversion"/>
...
<!-- pollsensor example -->
<bind nodeset="/data/orx:meta/orx:location" type="geopoint"/>
<orx:pollsensor event="xforms-ready" ref="/data/meta/location"/>
{% endhighlight %}

An alternative syntax to set data values:
{% highlight xml %}
<bind nodeset="/data/meta/example" type="xsd:string"/>
<setvalue event="xforms-ready" ref="/data/meta/example"/>
    some data
</setvalue>
{% endhighlight %}


### Action Attributes

The following attributes are supported on action elements such as `<setvalue>`.

| attribute | description |
| --------- | --------- |
| `ref`     | Specifies the [path](#xpath-paths) to the instance node' \[required\].
| `event`   | Specifies the event that will trigger setting the value. See [events supported](#setvalue-events) \[required\]
| `value`   | Specifies the value to set. This could be a path or an expression (calculation).

### Action Events

The following event values are supported on action elements such as `<setvalue>`.

| event              | description |
|--------------------|-------------|
| xforms-ready       | Occurs when the forms viewing application has finished the initial set up of all XForms constructs and is ready for user interaction.
| xforms-revalidate  | Occurs when the viewing application validates all instance data in a particular model. This is the last event to occur before submitting (or saving a final record) and could be considered a 'record-complete' event.
| jr-insert          | Occurs when a repeat element creates a new element. The evaluation context is that of the **new** element for that repeat.
