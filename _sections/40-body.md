---
title: Body
---

The `<body>` contains the information required to display a question to a user, including the type of prompt, the appearance of the prompt (widget), the labels, the hints and the choice options.

{% highlight xml %}
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
{% endhighlight %}

### Body Elements

The following form control elements are supported:

| control       | description
|---------------|------------
|`<input>`      | Used to obtain user input for data types: string, integer, decimal, and date.
|`<select1>`    | Used to display a single-select list (data type: select1)
|`<select>`     | Used to display a multiple-select list (data type: select)
|`<upload>`     | Used for image, audio, and video capture
|`<trigger>`    | Used to obtain user confirmation (e.g. by displaying a single tickbox or button). Will add value _"OK"_ to corresponding instance node when user confirms. If not confirmed the value remains empty. Behaviour can be modified to just show the label without a prompt, if `appearance="minimal"` is used (see [appearances](#appearances)). The latter deviates from XForms and its use is discouraged. It is much better to use a readonly input for this purpose.

The following user interface elements are supported:

| element       | description
|---------------|---------------------------------------
| `<group>`     | Child of `<body>`, another `<group>`, or a `<repeat>` that groups form controls together. See [groups](#groups) section for further details.
| `<repeat>`    | Child of `<body>` or `<group>` that can be repeated. See [repeats](#repeats) for further details.

Within the form controls the following elements can be used:

| element       | description
|---------------|------------------
| `<label>`     | Child of a [form control](#body-elements) element, `<item>`, `<itemset>` or `<group>` used to display a label. Only 1 `<label>` per form control is properly supported but can be used in [multiple languages](#languages)).
| `<hint>`      | Child of a [form control](#body-elements) element used to display a hint. Only 1 `<hint>` element per form control is properly supported but can be used in [multiple languages](#languages)).
| `<help>`      | Similar to `<hint>` to display a help message. [enketo](# "Help element not supported in Enketo.")
| `<output>`    | Child of a `<label>`, `<hint>` or `<help>` element used to display an instance value, inline, as part of the label, hint, or help text.
| `<item>`      | Child of `<select>` or `<select1>` that defines an choice option.
| `<itemset>`   | Child of `<select>` or `<select1>` that defines a list of choice options to be obtained elsewhere (from a [secondary instance](#secondary-instances)).
| `<value>`     | Child of `<item>` or `<itemset>` that defines a choice value.

Below is an example of a labels, an output, a hint, an itemset and value used together to define a form control:

{% highlight xml %}
 <group ref="/data/loc">
    <label>Location</label>
    ...
    <select1 ref="/data/loc/city">
        <label>City</label>
        <hint>Cities in <output value="/data/loc/country"/></hint>
        <itemset nodeset="instance('cities')/root/item[country= /data/loc/country ]">
            <value ref="name"/>
            <label ref="label"/>
        </itemset>
    </select1>
</group>
{% endhighlight %}

### Body Attributes

The following attributes are supported on body elements. Note that most attributes can only be used on specific elements. If such a specific attribute is used on elements that do not support it, it will usually be silently ignored. 

| attribute     | description
|---------------|----------------
| `ref` / `nodeset` | To link a body element with its corresponding data node and binding, both `nodeset` and `ref` attributes can be used. The convention that is helpful is the one used in XLSForms: use `nodeset="/some/path"` for `<repeat>` and `<itemset>` elements and use `ref="/some/path"` for everything else. The `ref` attribute can also refer to an itext reference (see [languages](#languages))
| `appearance`    | For all form control elements and groups to change their appearance. See [appearances](#appearances)
| `jr:count`      | For the `<repeat>` element (see [repeats](#repeats)). This is one of the ways to specify how many repeats should be created by default.
| `jr:noAddRemove`| For the `<repeat>` element (see [repeats](#repeats)). This indicates whether the user is allowed to add or remove repeats. Can have values `true()` and `false()`
| `value`         | For the `<output>` element to reference the node value to be displayed.
| `rows`          | Specifies the minimum number of rows a string `<input>` field gets. [enketo](# "Not supported in Enketo. In Enketo a similar effect is achieved by adding appearance="multiline".")


### Appearances

The appearance of the 5 form controls can be changed with appearance attributes. Appearance values usually relate to a specific [data](#data-types) or [question](#body-elements) type. Multiple space-separated appearance values can be added to a form control.

An appearance attribute can also be used to indicate that an [external app](#external-applications) should be used as a form control.

The following appearances are supported:

| appearance    | description 
|---------------|--------------
| `field-list`  | On a `<group>` this will show the complete group on one page. [enketo](# "Enketo requires <h:body class="pages"> to conform to this behaviour. The default behaviour is to put all questions on one page.")
| `minimal`     | On a `<select>` and `<select1>` this will display the choice list as a "dropdown". On a `<trigger>` this will show just the label, without a user prompt. [enketo](# "Minimal on triggers is not supported in Enketo.")
| `label`       | On a `<select>` and `<select1>` this will only show the question labels without the radiobuttons or checkboxes. Together with `field-list` and `list-nolabel` this can be used to display a question table.
| `list-nolabel`| On a `<select>` and `<select1>` this will only show the radiobuttons or checkboxes without labels. Together with `field-list` and `label` this can be used to display a question table.
| `compact`     | On a `<select>` and `<select1>` with image labels this will show just the image labels in a grid that can be selected by clicking on them.
| `quick`       | On a `<select>` and `<select1>` this will automatically advance to the next page when an answer has been selected. [enketo](# "Appearance 'quick' is not supported in Enketo")
| `intent:####` | See [External Applications](#external-applications)
