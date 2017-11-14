@extends('layouts.app')

<div class="topmenu-offset"></div>

<div class="container">

    <div class="panel panel-primary">
        <div class="panel-heading">
            <span>{{ $header }}</span>
            <div class="btn-group pull-right">
            </div>
        </div>
        <div class="panel-body text-center">

            <div class="jumbotron">
                <h1>{{ $title }}</h1>
            </div>
            <p>{{ $subtitle }}</p>

        </div>
    </div>
</div>