<?php $__env->startSection('content'); ?>

<div class="topmenu-offset"></div>

<div class="jumbotron text-center">

    <img src="<?php echo e(url('css/img/social_logos/155x100.png')); ?>" alt="Darkan logo">
    <h1><?=Lang::get('editor.PROJECTNOT_EXIST')?></h1>
    <figcaption><?=Lang::get('editor.PROJECTNOT_EXIST_EXTRA')?></figcaption>

</div>

<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>