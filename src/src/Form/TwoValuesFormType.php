<?php

declare(strict_types=1);

namespace App\Form;

use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class TwoValuesFormType.
 *
 * @author Majid Mvulle <majid@majidmvulle.com>
 */
class TwoValuesFormType extends SingleValueFormType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        parent::buildForm($builder, $options);

        $builder->add('secondValue', NumberType::class, ['constraints' => [
            new NotBlank(),
        ]]);
    }
}
