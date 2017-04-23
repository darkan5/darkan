@extends('layouts.app')

@section('content')

<div class="topmenu-offset"></div>

<div class="jumbotron text-center">

    <img src="{{ url('css/img/social_logos/155x100.png') }}" alt="Darkan logo">
    <h1><?=Lang::get('editor.PROJECTNOT_EXIST')?></h1>
    <figcaption><?=Lang::get('editor.PROJECTNOT_EXIST_EXTRA')?></figcaption>

</div>

@endsection
