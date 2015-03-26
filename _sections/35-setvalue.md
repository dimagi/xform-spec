---
title: Actions
---

The XForm can specify an action that should be taken in response to a particular event. The only action supported is *setvalue* which sets an instance value. It can be included by using `<setvalue>` childnodes in the model (i.e. as siblings of `<bind>` nodes).

[enketo](# "Actions not supported in Enketo. Known meta nodes are 'magically' (consistently) populated in Enketo.")

{% highlight xml %}
<bind nodeset="/data/meta/timeStart" type="xsd:dateTime"/>
<bind nodeset="/data/meta/timeEnd" type="xsd:dateTime"/>
<setvalue event="xforms-ready" ref="/data/meta/timeStart" value="now()"/>
<setvalue event="xforms-revalidate" ref="/data/meta/timeEnd" value="now()"/>
<setvalue event="xforms-ready" ref="/data/meta/deviceID" value="instance('commcaresession')/session/context/deviceid"/>
<setvalue event="xforms-ready" ref="/data/meta/username" value="instance('commcaresession')/session/context/username"/>
<setvalue event="xforms-ready" ref="/data/meta/userID" value="instance('commcaresession')/session/context/userid"/>
<setvalue event="xforms-ready" ref="/data/meta/instanceID" value="uuid()"/>
<setvalue event="xforms-ready" ref="/data/meta/appVersion" value="instance('commcaresession')/session/context/appversion"/>
{% endhighlight %}

An alternative syntax for raw data values:
{% highlight xml %}
<bind nodeset="/data/meta/example" type="xsd:string"/>
<setvalue event="xforms-ready" ref="/data/meta/example"/>
    some data
</setvalue>
{% endhighlight %}

### Setvalue Attributes

The following attributes are supported on `<setvalue>` nodes. [review]()

| attribute | description |
| --------- | --------- |
| `ref`    | Specifies the [path](#xpath-paths) to the instance node' \[required\].
| `event`  | Specifies the event that will trigger setting the value. See [events supported](#setvalue-events)
| `value`  | Specifies the value to set. This could be a path or an expression (calculation).


### Setvalue Events

The following event values are supported on `<setvalue>` nodes. [review]()

| event              | description |
|--------------------|-------------|
| xforms-ready       | Occurs when the forms viewing application has finished the initial set up of all XForms constructs and is ready for user interaction.
| xforms-revalidate  | Occurs when the viewing application validates all instance data in a particular model. This is the last event to occur before submitting (or saving a final record) and could be considered a 'record-complete' event.
| jr-insert          | Occurs when a repeat element creates a new element. The evaluation context is that of the **new** element for that repeat.
