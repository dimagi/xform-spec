---
title: External Applications
---

A form may include links to external applications that can be used to set instance values. This is done by calling out an _intent_ on the Operating System and receiving a [structured response]() [review](# "missing link") from the activity that handles that intent. This is described by an `<intent>` element that is a child of the `<head>` element.

[enketo](# 'Enketo does not support the use of external mobile applications. Fails silently.')

This functionality includes the ability to pass parameters as part of the external application request. An encryption key may  be passed to ensure that data is not stored unencrypted in the filesystem.

The example below shows a form that calls 2 different external apps to obtain values for 2 questions.

{% highlight xml %}
...
<h:head>
    <h:title>...</h:title>
    <model>
        <instance>
            <data xmlns:jrm="http://dev.commcarehq.org/jr/xforms" xmlns="http://openrosa.org/formdesigner/72AE4C2A-D6C3-4038-B128-C2AA7EFAF014" uiVersion="1" version="603" name="External Callouts">
                <breath_count/>
                <smsCallout/>
                ....
            </data>
        </instance>
    </model>
    ...
    <bind nodeset="/data/breath_count" type="intent" />
    <bind nodeset="/data/smsCallout" type="intent" />
    <odkx:intent
            xmlns:odkx="http://opendatakit.org/xforms"
            id="breath_count" class="org.commcare.respiratory.BREATHCOUNT">
        <extra key="display_text" ref="data/text_Entry" />
    </odkx:intent>
    <odkx:intent
            xmlns:odkx="http://opendatakit.org/xforms"
            id="smsCallout"
            type="vnd.android-dir/mms-sms"
            class="android.intent.action.VIEW"
            button-label="Send SMS">
        <extra key="sms_body" ref="/data/content" />
        <extra xmlns="http://www.w3.org/2002/xforms" key="address" ref="/data/address" />
    </odkx:intent>
</h:head>
<h:body>
    <input ref="/data/breath_count" appearance="intent:breath_count">
        <label ref="jr:itext('breath_count-label')" />
    </input>
    <input ref="/data/smsCallout" appearance="intent:smsCallout">
        <label ref="jr:itext('smsCallout-label')" />
    </input>
</h:body>
...
{% endhighlight %}

### Declaring external application

The `<intent>` element (namespace: "http://opendatakit.org/xforms") can be used to define the link with an external application. It supports the following possible attributes:

| attribute    | description
|--------------|--------------
| id           | The id of the intent. Will be referenced by form elements \[required\].
| class        | The Android action which will be used in the intent \[required\].
| type         | The MIME type of the expected data.
| button-label | The button label text to show in the form UI

The `<intent>` may contain multiple `<extra>` child elements that specify parameters to be passed to the intent target according to [this bundle format]() [review](# "link?")). These elements support the following attributes:

| attribute    | description
|--------------|--------------
| key          | The string key for an extra value which will be included in the intent bundle \[required\].
| ref          | An XPath reference to a string value.
| key_aes_storage | (key name?, attribute on intent?, attribute on extra?): A raw AES symetric key. If any file references are returned from this callout, they should be encrypted by this key. [review]()

### Using external application

As the code snippet above shows, the external application can be called by using an appearance on a form control, e.g.

`<input ref="/data/breath_count" appearance="intent:breath_count">`

The value after `intent:` refers to the `id` of an `<intent>` element, in the example's case to an intent with id _breath_count_

The corresponding `<bind>` element has the datatype `intent`.

### Response

The response format expected from the external application is described [here]() [review](# "link?").
